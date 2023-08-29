import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

import TagList from './Tag';
import BackButton from './BackButton';
import clsx from 'clsx';

export default function ProjectCard({
    project,
    modal = false,
}: {
    project: Project;
    modal?: boolean;
}) {
    const Markdown = ({ children }: { children: string }) => (
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

    return (
        <div className="flex w-full flex-col px-4 pb-4">
            {/* Title - Client - Year */}
            <div className="sticky top-0 grid grid-cols-12 bg-neutral-50 py-4 dark:bg-neutral-950">
                <BackButton modal={modal} />
                <h2 className="col-span-4 flex w-full justify-center whitespace-nowrap text-xl font-bold text-neutral-900 dark:text-neutral-100">
                    {project.title}
                </h2>
            </div>
            <div className="mb-4 flex w-full flex-col gap-2 sm:flex-row md:gap-4">
                {project.img && (
                    <Image
                        width={800}
                        height={400}
                        src={project.img}
                        alt={project.title}
                        className="aspect-video w-full min-w-[50%] rounded-lg border shadow-sm sm:w-1/2"
                    />
                )}

                <div className="flex w-full flex-col gap-2 py-2 sm:ml-4">
                    {/* Details */}
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">
                        <p>Made For: {project.client}</p>
                        <p>
                            Last Modified: {project.month}/{project.year}
                        </p>
                    </div>

                    {/* Project Link */}
                    {project.href && (
                        <Link
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-600 hover:underline dark:text-neutral-300"
                        >
                            View Project
                        </Link>
                    )}

                    {/* Tags */}
                    <TagList tags={project.tags} />
                </div>
            </div>
            {project.info && (
                <div className="flex flex-col gap-2">
                    <Markdown>{project.info}</Markdown>
                </div>
            )}
        </div>
    );
}
