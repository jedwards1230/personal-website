import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ChatBubble({
    msg,
    className = '',
}: {
    msg: ChatGPTMessage;
    className?: string;
}) {
    if (msg.content === '') return null;
    return (
        <AnimatePresence>
            <motion.div
                key={`chat-bubble-${msg.content}`}
                layout
                className={clsx(
                    'flex',
                    msg.role === 'user' ? 'justify-end' : 'justify-start',
                    className
                )}
            >
                <ReactMarkdown
                    className={clsx(
                        'prose prose-neutral flex flex-col overflow-x-scroll rounded border px-3 py-2 prose-a:text-blue-600 [&>*]:my-1',
                        msg.role === 'user'
                            ? 'bg-blue-500 text-right text-white dark:border-blue-400'
                            : 'bg-gray-100 text-left dark:border-gray-100 dark:bg-gray-200 dark:prose-ul:decoration-red-500'
                    )}
                    remarkPlugins={[remarkGfm]}
                >
                    {msg.content}
                </ReactMarkdown>
            </motion.div>
        </AnimatePresence>
    );
}
