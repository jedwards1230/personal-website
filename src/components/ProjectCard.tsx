'use client';

import Image from 'next/image';
import Link from 'next/link';

import TagList from './Tag';
import BackButton from './BackButton';

export default function ProjectCard({
    project,
    modal = false,
}: {
    project: Project;
    modal?: boolean;
}) {
    return (
        <div className="flex w-full flex-col p-4">
            {/* Title - Client - Year */}
            <div className="mb-3 grid grid-cols-12">
                <BackButton modal={modal} />
                <h2 className="col-span-4 flex w-full justify-center whitespace-nowrap text-xl font-bold text-neutral-900 dark:text-neutral-100">
                    {project.title}
                </h2>
            </div>
            <div className="mb-2 flex w-full flex-col gap-2 sm:flex-row md:gap-4">
                {project.img && (
                    <Image
                        width={800}
                        height={400}
                        src={project.img}
                        alt={project.title}
                        className="aspect-video w-full rounded-lg border shadow-sm sm:w-1/2"
                    />
                )}

                <div className="ml-4 flex w-full flex-col gap-2 py-2">
                    {/* Description */}
                    <p className="text-neutral-700 dark:text-neutral-300">
                        {project.description}
                    </p>
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
                    {project.info.map((p) => (
                        <p key={'project-info-' + project.title}>{p}</p>
                    ))}
                </div>
            )}
        </div>
    );
}
