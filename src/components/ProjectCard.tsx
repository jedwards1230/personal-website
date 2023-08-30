import Image from 'next/image';
import Link from 'next/link';

import TagList from './TagList';
import BackButton from './BackButton';
import Markdown from './Markdown';
import clsx from 'clsx';

export default function ProjectCard({
    project,
    modal = false,
}: {
    project: Project;
    modal?: boolean;
}) {
    return (
        <div className="flex w-full flex-col pb-4 sm:px-4">
            {/* Title - Client - Year */}
            <div className="sticky top-0 grid grid-cols-12 bg-background py-4">
                <BackButton modal={modal} />
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

                <div
                    className={clsx(
                        'flex w-full flex-col gap-2 py-2',
                        project.img && 'sm:ml-4',
                    )}
                >
                    {/* Details */}
                    <div
                        className={clsx(!project.img && 'flex justify-between')}
                    >
                        <div>
                            <p className="text-xl ">{project.title}</p>
                            <p className="text-lg text-neutral-600 dark:text-neutral-300">
                                {project.client}
                            </p>
                        </div>
                        <div className="text-neutral-500 dark:text-neutral-400">
                            {project.month}/{project.year}
                        </div>
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
