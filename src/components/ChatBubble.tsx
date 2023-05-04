import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ChatBubble({
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
