import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';

export default function Markdown({ children }: { children: string }) {
    return (
        <ReactMarkdown
            components={{
                h1: ({ node, ...props }) => (
                    <h1
                        {...props}
                        className="text-lg font-bold text-neutral-900 dark:text-neutral-100"
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
                ul: ({ node, depth, ...props }) => (
                    <ul
                        {...props}
                        className={clsx(
                            'list-inside list-disc text-neutral-700 dark:text-neutral-300',
                            depth === 1 && 'ml-4',
                        )}
                    />
                ),
                li: ({ node, children, ...props }) => (
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
