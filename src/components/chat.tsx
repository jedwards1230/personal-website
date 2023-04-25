import { FormEvent, useEffect, useState } from 'react';
import useChat from '@/lib/useChat';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Chat() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const { messages, sendMessage } = useChat();

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (message.trim()) {
            setLoading(true);
            setMessage('');

            await sendMessage(message.trim());
            setLoading(false);
        }
    }

    return (
        <div className="md:w-5xl w-2xl lg:w-7xl max-w-2xl p-4 md:max-w-5xl lg:max-w-7xl">
            <div className="max-h-[400px] overflow-y-scroll rounded bg-white p-4 shadow">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`mb-2 ${
                            msg.role === 'user' ? 'text-right' : 'text-left'
                        }`}
                    >
                        <ReactMarkdown
                            className={`prose inline-block rounded p-2 ${
                                msg.role === 'user'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200'
                            }`}
                            remarkPlugins={[remarkGfm]}
                        >
                            {msg.content}
                        </ReactMarkdown>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="mt-4">
                {/* todo: limit to something reasonable */}
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded border p-2"
                    placeholder="Type your message"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 w-full rounded bg-blue-500 p-2 text-white"
                >
                    {loading ? (
                        <div className="animate-pulse font-bold tracking-widest">
                            ...
                        </div>
                    ) : (
                        'Send'
                    )}
                </button>
            </form>
        </div>
    );
}
