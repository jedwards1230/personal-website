import OpenAI from 'openai';
import { Stream } from 'openai/streaming';

export async function fetchChat(
    messages: Message[],
    stream?: boolean,
): Promise<Message | ReadableStream> {
    const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            messages: messages.map((m) => ({
                role: m.role,
                content: m.content,
            })),
            stream,
        }),
    });

    if (stream) return res.body;

    const data = await res.json();

    if (data.error) throw new Error(data.error);

    return data.choices[0].message;
}

export async function readStream(
    stream: ReadableStream,
    chunkCallback: (token: string) => void,
) {
    const reader = stream.getReader();
    let accumulatedResponse = '';

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) {
            const decoded = new TextDecoder().decode(value);
            accumulatedResponse += decoded;
            chunkCallback(accumulatedResponse);
        }
    }

    return accumulatedResponse;
}

export function parseStreamData(chunk: string): StreamData[] {
    try {
        return chunk
            .split('\n')
            .filter((c) => c.length > 0)
            .map((c) => {
                // TODO: ensure this only replaces the first instance
                const jsonStr = c.replace('data: ', '');
                if (jsonStr === '[DONE]') return;
                try {
                    return JSON.parse(jsonStr);
                } catch {
                    return;
                }
            });
    } catch (e) {
        console.error(e);
        console.log(chunk);
        return [];
    }
}

export function toReadableStream(
    stream: Stream<OpenAI.Chat.Completions.ChatCompletionChunk>,
): ReadableStream {
    let iter: AsyncIterator<OpenAI.Chat.Completions.ChatCompletionChunk>;
    const encoder = new TextEncoder();

    return new ReadableStream({
        async start() {
            iter = stream[Symbol.asyncIterator]();
        },
        async pull(ctrl) {
            try {
                const { value, done } = await iter.next();
                if (done) return ctrl.close();

                const str =
                    typeof value === 'string'
                        ? value
                        : // Add a newline after JSON to make it easier to parse newline-separated JSON on the frontend.
                          JSON.stringify(value) + '\n';
                const bytes = encoder.encode(str);

                ctrl.enqueue(bytes);
            } catch (err) {
                ctrl.error(err);
            }
        },
        async cancel() {
            await iter.return?.();
        },
    });
}
