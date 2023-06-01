'use client';

import { useChat } from '@/lib/chatContext';
import { useState, FormEvent } from 'react';
import ChatSuggestions from './ChatSuggestions';
import Buttons from './Buttons';

export default function ChatInterface() {
    const [message, setMessage] = useState('');
    const { sendMessage } = useChat();

    function handleSubmit(e: FormEvent | KeyboardEvent) {
        e.preventDefault();
        const trimmed = message.trim();
        if (trimmed) {
            setMessage('');

            try {
                sendMessage(trimmed);
            } catch (e) {
                console.error(e);
            }
        }
    }

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="flex w-full flex-col gap-y-4"
            >
                <ChatSuggestions />
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSubmit(e);
                        }
                    }}
                    maxLength={100}
                    className="flex w-full self-center rounded border p-3 shadow-lg outline-none transition-all focus:p-4 focus:outline-none dark:bg-neutral-800 dark:text-neutral-200"
                    placeholder="Type your message"
                />
                <Buttons />
            </form>
        </>
    );
}
