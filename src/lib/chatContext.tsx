'use client';

import React, { createContext, useState, useEffect } from 'react';
import { getInitialState } from './gpt'; // Import the sendMessage function

type ChatState = {
    messages: ChatGPTMessage[];
    resetChat: () => void;
    sendMessage: (text: string) => Promise<void>;
};

const initialState: ChatState = {
    messages: [],
    resetChat: () => {},
    sendMessage: async (text: string) => {},
};

const ChatContext = createContext<ChatState>(initialState);

export const useChat = () => React.useContext(ChatContext);

export function ChatContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [messages, setMessages] = useState<ChatGPTMessage[]>([]);

    const resetChat = async () => {
        const initialMessages = await getInitialState();
        setMessages(initialMessages);
    };

    const sendServerRequest = async (messages: ChatGPTMessage[]) => {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: messages.map((m) => ({
                    role: m.role,
                    content: m.content,
                })),
            }),
        });

        if (!response.ok) throw new Error('Unexpected response');

        switch (response.headers.get('content-type')) {
            case 'text/event-stream':
                const id = Date.now();

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

    const sendMessage = async (message: string) => {
        const newMessage: ChatGPTMessage = { role: 'user', content: message };
        const newMessages = [...messages, newMessage];
        setMessages(newMessages);

        await sendServerRequest(newMessages);
    };

    useEffect(() => {
        resetChat();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ChatContext.Provider value={{ messages, resetChat, sendMessage }}>
            {children}
        </ChatContext.Provider>
    );
}

export default ChatContext;
