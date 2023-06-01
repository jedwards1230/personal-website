'use client';

import { useChat } from '@/lib/chatContext';
import { useState, FormEvent } from 'react';
import { ResetIcon } from './icons';
import ChatHistory from './ChatHistory';
import ChatSuggestions from './ChatSuggestions';

export default function ChatInterface() {
    const [message, setMessage] = useState('');
    const { sendMessage, reset, loading } = useChat();

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
            <ChatHistory />
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
                    className="prose flex w-full self-center rounded border p-3 shadow-lg outline-none transition-all focus:p-4 focus:outline-none dark:bg-gray-200"
                    placeholder="Type your message"
                />
                <Buttons loading={loading} resetChat={reset} />
            </form>
        </>
    );
}

function Buttons({
    loading,
    resetChat,
}: {
    loading: boolean;
    resetChat: () => void;
}) {
    return (
        <div className="flex gap-2">
            <button
                title="Reset chat"
                onClick={resetChat}
                disabled={loading}
                className="rounded bg-purple-500 p-3 text-white shadow-md transition-colors hover:bg-purple-600"
            >
                <ResetIcon width={24} height={24} />
            </button>
            <button
                title='Send message (or press "Enter")'
                className="w-full rounded bg-blue-500 p-3 text-white shadow-md transition-colors hover:bg-blue-400 dark:hover:bg-blue-600"
            >
                Send
            </button>
        </div>
    );
}
