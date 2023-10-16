import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';

export default function Markdown({ children }: { children: string }) {
    return (
        <ReactMarkdown
            components={{
                h1: ({ node, ...props }) => (
                    <h1
                        {...props}
                        className="text-lg font-medium text-neutral-900 dark:text-neutral-100"
                    />
                ),
                h2: ({ node, ...props }) => (
                    <h2
                        {...props}
                        className="font-medium text-neutral-900 dark:text-neutral-100"
                    />
                ),
                p: ({ node, ...props }) => (
                    <span
                        {...props}
                        className="text-neutral-700 dark:text-neutral-300"
                    />
                ),
                strong: ({ node, ...props }) => (
                    <strong
                        {...props}
                        className="text-neutral-900 dark:text-neutral-100"
                    />
                ),
                ol: ({ node, ordered, ...props }) => (
                    <ol
                        {...props}
                        className="list-inside list-decimal pl-4 text-neutral-700 dark:text-neutral-300"
                    />
                ),
                ul: ({ node, ordered, ...props }) => (
                    <ul
                        {...props}
                        className="list-inside list-disc pl-4 text-neutral-700 dark:text-neutral-300"
                    />
                ),
                li: ({ node, children, ordered, ...props }) => (
                    <li
                        {...props}
                        className="text-neutral-700 dark:text-neutral-300"
                    >
                        {children}
                    </li>
                ),
            }}
        >
            {children}
        </ReactMarkdown>
    );
}
