import { FormEvent, useState } from 'react';
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
            <div className="flex flex-col gap-2 rounded border bg-white p-4 shadow-lg">
                {messages.map((msg, index) => (
                    <ChatBubble
                        key={msg.content + msg.role + index}
                        msg={msg}
                    />
                ))}
            </div>
            <form onSubmit={handleSubmit} className="mt-4">
                {/* todo: limit to something reasonable */}
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded border p-2 shadow-lg"
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
                className={`prose flex flex-col rounded px-3 py-2 [&>*]:my-1 ${
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
