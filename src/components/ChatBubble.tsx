import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import ReactMarkdown from 'react-markdown';
import { SpecialComponents } from 'react-markdown/lib/ast-to-react';
import { NormalComponents } from 'react-markdown/lib/complex-types';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
    vs,
    vscDarkPlus,
} from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function ChatBubble({
    msg,
    className = '',
}: {
    msg: ChatGPTMessage;
    className?: string;
}) {
    const { resolvedTheme } = useTheme();

    const getComponents = (role: ChatGPTAgent) => {
        const components: Partial<
            Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents
        > = {
            h1: ({ node, ...props }) => (
                <h1 {...props} className="text-2xl font-bold" />
            ),
            h2: ({ node, ...props }) => (
                <h2 {...props} className="text-xl font-bold" />
            ),
            h3: ({ node, ...props }) => (
                <h3 {...props} className="text-lg font-bold" />
            ),
            h4: ({ node, ...props }) => (
                <h4 {...props} className="text-base font-bold" />
            ),
            h5: ({ node, ...props }) => (
                <h5 {...props} className="text-sm font-bold" />
            ),
            h6: ({ node, ...props }) => (
                <h6 {...props} className="text-xs font-bold" />
            ),
            p: ({ node, ...props }) => <p {...props} className="text-base" />,
            blockquote: ({ node, ...props }) => (
                <blockquote
                    {...props}
                    className="border-l-4 border-blue-500 pl-4"
                />
            ),
            br: ({ node, ...props }) => <br {...props} className="my-1" />,
            pre: ({ node, ...props }) => (
                <pre {...props} className="w-full overflow-x-scroll" />
            ),
            code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                    <SyntaxHighlighter
                        {...props}
                        style={resolvedTheme !== 'dark' ? vs : vscDarkPlus}
                        language={match[1]}
                        className="!w-full !overflow-x-scroll"
                    >
                        {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                ) : (
                    <code
                        {...props}
                        className={clsx(
                            className,
                            '!w-full !overflow-x-scroll transition-colors'
                        )}
                    >
                        {children}
                    </code>
                );
            },
            em: ({ node, ...props }) => <em {...props} className="italic" />,
            strong: ({ node, ...props }) => (
                <strong {...props} className="font-bold" />
            ),
            hr: ({ node, ...props }) => <hr {...props} className="my-2" />,
            li: ({ node, index, ordered, checked, ...props }) => (
                <li {...props} className="ml-1" />
            ),
            ol: ({ node, depth, ordered, ...props }) => (
                <ol {...props} className="ml-4 list-outside list-decimal" />
            ),
            ul: ({ node, depth, ordered, ...props }) => (
                <ul {...props} className="ml-4 list-outside list-disc" />
            ),
            a: ({ node, ...props }) => (
                <a
                    {...props}
                    target="_blank"
                    className={clsx(
                        'hover:underline',
                        role === 'user' ? 'text-semibold' : 'text-blue-500'
                    )}
                />
            ),
            del: ({ node, ...props }) => (
                <del {...props} className="line-through" />
            ),
            input: ({ node, ...props }) => (
                <input {...props} className="rounded bg-gray-100 px-1 py-0.5" />
            ),
            table: ({ node, ...props }) => (
                <table
                    {...props}
                    className="border-collapse border border-gray-300"
                />
            ),
            tbody: ({ node, ...props }) => <tbody {...props} />,
            td: ({ node, isHeader, ...props }) => (
                <td {...props} className="border border-gray-300 px-2 py-1" />
            ),
            th: ({ node, isHeader, ...props }) => (
                <th {...props} className="border border-gray-300 px-2 py-1" />
            ),
            thead: ({ node, ...props }) => <thead {...props} />,
            tr: ({ node, isHeader, ...props }) => (
                <tr {...props} className="border" />
            ),
        };
        return components;
    };

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
                        'flex flex-col overflow-x-scroll rounded border px-3 py-2 [&>*]:my-1',
                        msg.role === 'user'
                            ? 'bg-blue-500 text-right text-white dark:border-blue-500 dark:bg-blue-600 dark:text-neutral-200'
                            : 'border-neutral-300 bg-neutral-50 text-left dark:border-neutral-500 dark:bg-neutral-800 dark:prose-ul:decoration-red-500'
                    )}
                    remarkPlugins={[remarkGfm]}
                    components={getComponents(msg.role)}
                >
                    {msg.content}
                </ReactMarkdown>
            </motion.div>
        </AnimatePresence>
    );
}
