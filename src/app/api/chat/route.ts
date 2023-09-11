import { Type } from 'lucide-react';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

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
            // TODO: stream response
            return NextResponse.json(response);
        } else {
            return NextResponse.json(response);
        }
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message });
    }
}
