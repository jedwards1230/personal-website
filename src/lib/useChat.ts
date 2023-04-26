'use client';

import { useState } from 'react';
import { initialState } from './gpt';

export default function useChat() {
    const [messages, setMessages] = useState(initialState);

    const sendMessage = async (message: string) => {
        const id = Date.now();

        const newMessage: ChatGPTMessage = { role: 'user', content: message };
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [
                    ...messages.map(({ role, content }) => ({
                        role,
                        content,
                    })),
                    newMessage,
                ],
            }),
        });

        switch (response.headers.get('content-type')) {
            case 'text/event-stream':
                const reader = response.body?.getReader();
                let accumulatedResponse = '';

                if (reader) {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;
                        if (value) {
                            const decoded = new TextDecoder().decode(value);
                            accumulatedResponse += decoded;
                        }
                        setMessages((prevMessages) => [
                            ...prevMessages.filter((m) => m.id !== id),
                            {
                                id,
                                role: 'assistant',
                                content: accumulatedResponse,
                            },
                        ]);
                    }
                }
                break;
            case 'application/json':
                const answer = (await response.json()) as ChatResponse;
                if (!answer || !answer.choices || !answer.choices.length)
                    return;
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        role: 'assistant',
                        content: answer.choices[0].message.content,
                    },
                ]);
                break;
            default:
                throw new Error('Unexpected response type');
        }
    };

    return { messages: messages.slice(1), sendMessage };
}
