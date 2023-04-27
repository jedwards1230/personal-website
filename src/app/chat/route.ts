import {
    createParser,
    ParsedEvent,
    ReconnectInterval,
} from 'eventsource-parser';

import {
    getChat,
    getEmbedding,
    searchSimilarDocuments,
    updateContext,
} from '@/lib/gpt';

export const runtime = 'experimental-edge';

export async function POST(request: Request) {
    const { messages } = (await request.json()) as {
        messages: ChatGPTMessage[];
    };

    // Get the last user message from the messages array
    const lastUserMessage = messages
        .filter((message) => message.role === 'user')
        .pop()?.content;

    if (!lastUserMessage) {
        return new Response('No user message found', { status: 400 });
    }

    const lastAssistantMessage = messages
        .filter((message) => message.role === 'assistant')
        .pop()?.content;

    if (!lastAssistantMessage) {
        return new Response('No assistant message found', { status: 400 });
    }

    // Get the embedding vector for the last user message
    const queryEmbedding = await getEmbedding(
        `assistant: ${lastAssistantMessage}\n\nuser: ${lastUserMessage}`
    );

    let data: EmbeddedDocument[];
    try {
        data = await searchSimilarDocuments(queryEmbedding);
    } catch (error) {
        console.log('error', error);
    }

    const bodies = data.map((document) => JSON.stringify(document));

    const payload = data
        ? updateContext(messages, bodies.join('\n'))
        : messages;

    const res = await getChat(payload);

    if (res.headers.get('content-type') === 'text/event-stream') {
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();

        let counter = 0;

        const stream = new ReadableStream({
            async start(controller) {
                function onParse(event: ParsedEvent | ReconnectInterval) {
                    if (event.type === 'event') {
                        const data = event.data;
                        if (data === '[DONE]') {
                            controller.close();
                            return;
                        }
                        try {
                            const json = JSON.parse(data);
                            const text = json.choices[0].delta?.content || '';
                            if (
                                counter < 2 &&
                                (text.match(/\n/) || []).length
                            ) {
                                // this is a prefix character (i.e., "\n\n"), do nothing
                                return;
                            }
                            const queue = encoder.encode(text);
                            controller.enqueue(queue);
                            counter++;
                        } catch (e) {
                            controller.error(e);
                        }
                    }
                }

                const parser = createParser(onParse);
                for await (const chunk of res.body as any) {
                    parser.feed(decoder.decode(chunk));
                }
            },
        });

        return new Response(stream, {
            headers: {
                'content-type': 'text/event-stream',
            },
        });
    }

    const answer = (await res.json()) as ChatResponse;

    return new Response(JSON.stringify(answer), {
        headers: {
            'content-type': 'application/json',
        },
    });
}
