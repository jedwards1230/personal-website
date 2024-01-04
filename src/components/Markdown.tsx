import ReactMarkdown from "react-markdown";

export default function Markdown({ children }: { children: string }) {
	return (
		<ReactMarkdown
			className="space-y-2"
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
				ol: ({ node, ...props }) => (
					<ol
						{...props}
						className="list-inside list-decimal pl-4 text-neutral-700 dark:text-neutral-300"
					/>
				),
				ul: ({ node, ...props }) => (
					<ul
						{...props}
						className="list-inside list-disc pl-4 text-neutral-700 dark:text-neutral-300"
					/>
				),
				li: ({ node, children, ...props }) => (
					<li
						{...props}
						className="text-neutral-700 dark:text-neutral-300 [&>*]:inline-block"
					>
						{children}
					</li>
				),
				pre: ({ node, children, ...props }) => (
					<pre
						{...props}
						className="rounded-rounded overflow-x-scroll rounded border border-border bg-secondary p-1"
					>
						{children}
					</pre>
				),
			}}
		>
			{children}
		</ReactMarkdown>
	);
}
