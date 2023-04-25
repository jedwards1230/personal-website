'use client';

import { useState } from 'react';
import context from '@/context.md';

export default function useChat() {
    const [messages, setMessages] = useState<ChatGPTMessage[]>([
        {
            role: 'system',
            content: context,
        },
        {
            role: 'assistant',
            content:
                "Hello, I am Justin's personal assistant. How can I help you?",
        },
    ]);

    const sendMessage = async (message: string) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { role: 'user', content: message },
        ]);

        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [...messages, { role: 'user', content: message }],
            }),
        });

        if (response.headers.get('content-type') === 'text/event-stream') {
            const reader = response.body?.getReader();
            let accumulatedResponse = '';

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    if (value) {
                        const decoded = new TextDecoder().decode(value);
                        accumulatedResponse += decoded;
                        console.log('accumulatedResponse', accumulatedResponse);
                        console.log('decoded', decoded);
                    }
                }
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        role: 'assistant',
                        content: accumulatedResponse,
                    },
                ]);
            }
        } else {
            const answer = (await response.json()) as ChatResponse;
            if (!answer || !answer.choices || !answer.choices.length) return;
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    role: 'assistant',
                    content: answer.choices[0].message.content,
                },
            ]);
        }
    };

    return { messages: messages.slice(1), sendMessage };
}
