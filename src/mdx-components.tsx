import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        a: ({ children, href }) => (
            <a
                className="text-blue-700 hover:underline"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
            >
                {children}
            </a>
        ),
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-2">
                {children}
            </blockquote>
        ),
        br: () => <br />,
        code: ({ children }) => (
            <code className="rounded bg-gray-100 px-1">{children}</code>
        ),
        em: ({ children }) => <em className="italic">{children}</em>,
        h1: ({ children }) => (
            <h1 className="text-3xl font-bold">{children}</h1>
        ),
        h2: ({ children }) => (
            <h2 className="text-2xl font-bold">{children}</h2>
        ),
        h3: ({ children }) => (
            <h3 className="pb-1 pt-2 text-xl font-bold">{children}</h3>
        ),
        h4: ({ children }) => (
            <h4 className="py-1 text-lg font-bold">{children}</h4>
        ),
        h5: ({ children }) => (
            <h5 className="py-1 text-base font-bold">{children}</h5>
        ),
        h6: ({ children }) => (
            <h6 className="py-1 text-sm font-bold">{children}</h6>
        ),
        hr: () => <hr className="my-4 w-3/4" />,
        img: ({ src, alt }) => <img className="rounded" src={src} alt={alt} />,
        li: ({ children }) => <li className="text-base">{children}</li>,
        ol: ({ children }) => (
            <ol className="list-inside list-decimal">{children}</ol>
        ),
        p: ({ children }) => <p className="pl-2 text-base">{children}</p>,
        pre: ({ children }) => (
            <pre className="rounded bg-gray-100 px-1">{children}</pre>
        ),
        strong: ({ children }) => (
            <strong className="font-bold">{children}</strong>
        ),
        ul: ({ children }) => (
            <ul className="list-inside list-disc">{children}</ul>
        ),
        ...components,
    };
}
