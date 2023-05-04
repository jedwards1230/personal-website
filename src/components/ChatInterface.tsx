'use client';

import { useChat } from '@/lib/chatContext';
import { useState, FormEvent } from 'react';
import { ResetIcon } from './icons';
import ChatHistory from './ChatHistory';

export default function ChatInterface() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const { sendMessage, resetChat } = useChat();

    async function handleSubmit(e: FormEvent | KeyboardEvent) {
        e.preventDefault();
        if (message.trim()) {
            setLoading(true);
            setMessage('');

            try {
                await sendMessage(message.trim());
                setLoading(false);
            } catch (e) {
                console.error(e);
                setLoading(false);
            }
        }
    }

    return (
        <>
            <ChatHistory />
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* todo: limit to something reasonable */}
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
                    className="w-full rounded border px-4 py-4 shadow-lg focus:outline-none"
                    placeholder="Type your message"
                />
                <Buttons loading={loading} resetChat={resetChat} />
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
                className="rounded bg-purple-500 p-2 text-white shadow-md transition-colors hover:bg-purple-600"
            >
                <ResetIcon width={24} height={24} />
            </button>
            <button
                title='Send message (or press "Enter")'
                className="w-full rounded bg-blue-500 p-2 text-white shadow-md transition-colors hover:bg-blue-600"
            >
                Send
            </button>
        </div>
    );
}
