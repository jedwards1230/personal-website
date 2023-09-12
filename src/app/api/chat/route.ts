import { toReadableStream } from '@/app/(admin)/admin/utils';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { Stream } from 'openai/streaming';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
    const {
        messages,
        stream,
    }: {
        messages: Message[];
        stream?: boolean;
    } = await req.json();

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: messages,
            stream: stream,
        });

        if (stream) {
            const stream = toReadableStream(
                response as Stream<OpenAI.Chat.Completions.ChatCompletionChunk>,
            );
            return new Response(stream, {
                status: 200,
            });
        } else {
            return NextResponse.json(response);
        }
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message });
    }
}
