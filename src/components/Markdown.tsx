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
                    <p
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
                ol: ({ node, depth, ordered, ...props }) => (
                    <ol
                        {...props}
                        className={clsx(
                            'list-inside list-decimal text-neutral-700 dark:text-neutral-300',
                            depth === 1 && 'ml-4',
                        )}
                    />
                ),
                ul: ({ node, depth, ordered, ...props }) => (
                    <ul
                        {...props}
                        className={clsx(
                            'ml-2 list-inside list-disc text-neutral-700 dark:text-neutral-300',
                            depth === 1 && 'ml-4',
                        )}
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
