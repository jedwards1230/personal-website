import {
    createParser,
    ParsedEvent,
    ReconnectInterval,
} from 'eventsource-parser';

export const runtime = 'experimental-edge';

export async function POST(request: Request) {
    const { messages } = (await request.json()) as {
        messages: ChatGPTMessage[];
    };

    const payload: OpenAIStreamPayload = {
        model: 'gpt-4',
        messages,
        temperature: 0.7,
        max_tokens: 1000,
        stream: true,
    };

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    let counter = 0;

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_KEY}`,
        },
        method: 'POST',
        body: JSON.stringify(payload),
    });

    if (res.headers.get('content-type') === 'text/event-stream') {
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
