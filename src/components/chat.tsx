import { FormEvent, useState } from 'react';
import useChat from '@/lib/useChat';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Chat() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const { messages, sendMessage, resetChat } = useChat();

    async function handleSubmit(e: FormEvent) {
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
        <div className="w-full max-w-2xl p-4 md:w-auto md:max-w-5xl lg:max-w-7xl">
            <div className="flex flex-col gap-2 rounded border bg-white p-4 shadow-lg dark:border-none dark:bg-transparent dark:px-0">
                {messages.map((msg, index) => (
                    <ChatBubble
                        key={msg.content + msg.role + index}
                        msg={msg}
                    />
                ))}
            </div>
            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
                {/* todo: limit to something reasonable */}
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded border p-2 shadow-lg focus:outline-none"
                    placeholder="Type your message"
                />
                <div className="flex gap-2">
                    <button
                        onClick={resetChat}
                        title="Reset chat"
                        className="rounded bg-purple-500 p-2 text-white transition-colors hover:bg-purple-600"
                    >
                        {/* reset icon like spinning arrows */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                            />
                        </svg>
                    </button>
                    <button
                        type="submit"
                        title='Send message (or press "Enter")'
                        disabled={loading}
                        className="w-full rounded bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400"
                    >
                        {loading ? (
                            <div className="animate-pulse font-bold tracking-widest">
                                ...
                            </div>
                        ) : (
                            'Send'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

function ChatBubble({
    msg,
    className = '',
}: {
    msg: ChatGPTMessage;
    className?: string;
}) {
    return (
        <div
            className={`flex ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
            } ${className}`}
        >
            <ReactMarkdown
                className={`prose flex flex-col overflow-x-scroll rounded px-3 py-2 [&>*]:my-1 ${
                    msg.role === 'user'
                        ? 'bg-blue-500 text-right text-white'
                        : 'bg-gray-200 text-left'
                }`}
                remarkPlugins={[remarkGfm]}
            >
                {msg.content}
            </ReactMarkdown>
        </div>
    );
}
