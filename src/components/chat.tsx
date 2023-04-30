import { FormEvent, useState } from 'react';
import useChat from '@/lib/useChat';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ResetIcon } from './icons';

export default function Chat() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const { messages, sendMessage, resetChat } = useChat();

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
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSubmit(e);
                        }
                    }}
                    className="w-full rounded border p-2 shadow-lg focus:outline-none"
                    placeholder="Type your message"
                />
                <div className="flex gap-2">
                    <button
                        onClick={resetChat}
                        title="Reset chat"
                        disabled={loading}
                        className="rounded bg-purple-500 p-2 text-white transition-colors hover:bg-purple-600 disabled:cursor-not-allowed disabled:bg-gray-400"
                    >
                        <ResetIcon width={24} height={24} />
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
