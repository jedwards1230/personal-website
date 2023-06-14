import { searchSimilarDocuments } from '@/lib/gpt';
import { createResponseChain } from '@/lib/responseChain';

export const runtime = 'edge';

export async function POST(request: Request) {
    const req: {
        messages: ChatGPTMessage[];
        query: string;
    } = await request.json();
    const { messages, query } = req;

    try {
        const data = await searchSimilarDocuments(messages);
        const docs = data.map((document) => JSON.stringify(document));
        const prompt = `# Context\n ${docs.join(
            '\n'
        )}\n\n# Query\n${query}\n\n# Response\n`;

        const stream = new ReadableStream({
            async start(controller) {
                const encoder = new TextEncoder();

                const callback = (token: string) => {
                    const queue = encoder.encode(token);
                    controller.enqueue(queue);
                };

                const resolveChain = createResponseChain(callback, messages);

                await resolveChain.call({ input: prompt });

                controller.close();
            },
        });

        return new Response(stream, {
            headers: {
                'content-type': 'text/event-stream',
            },
        });
    } catch (error) {
        console.error('Error searching for similar documents:', error);
    }
}
