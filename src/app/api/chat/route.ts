import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
    const { messages } = await req.json();

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: messages,
        });

        return NextResponse.json(response);
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message });
    }
}
