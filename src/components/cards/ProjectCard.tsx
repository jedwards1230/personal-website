'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePlausible } from 'next-plausible';

import TagList from '../TagList';
import BackButton from '../buttons/BackButton';
import Markdown from '../Markdown';
import { Star } from '../Icons';
import { useNavigation } from '@/app/NavigationProvider';

export default function ProjectCard({
    project,
    modal = false,
}: {
    project: Project;
    modal?: boolean;
}) {
    const plausible = usePlausible();
    const { setImageOpen } = useNavigation();

    const openImageModal = () => {
        setImageOpen(true);
        plausible('View Project Image', {
            props: {
                project: project.title,
            },
        });
    };

    const images = project.images?.length
        ? project.images.filter((i) => i.length > 0)
        : [];

    return (
        <div className="flex w-full flex-col pb-4 sm:px-4">
            {/* Title - Client - Year */}
            <div className="sticky top-0 grid grid-cols-12 bg-background py-4">
                <BackButton modal={modal} />
            </div>
            <div className="mb-4 flex w-full flex-col gap-2 sm:flex-row md:gap-4">
                {images.length > 0 && (
                    <Image
                        width={800}
                        height={400}
                        src={images[0]}
                        alt={project.title}
                        onClick={openImageModal}
                        className="aspect-video w-full min-w-[50%] cursor-pointer select-none rounded-lg border border-foreground shadow-sm transition-all sm:w-1/2 hover:sm:scale-[101%]"
                    />
                )}

                <div
                    className={clsx(
                        'flex w-full flex-col gap-2 py-2',
                        images.length > 0 && 'sm:ml-4',
                    )}
                >
                    {/* Details */}
                    <div
                        className={clsx(
                            !images ||
                                (images.length === 0 && 'flex justify-between'),
                        )}
                    >
                        <div>
                            <p className="flex items-center gap-2 text-xl font-medium">
                                {project.title} {project.favorite && <Star />}
                            </p>
                            <p className="text-lg text-neutral-600 dark:text-neutral-300">
                                {project.company}
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
                <div className="flex flex-col gap-1">
                    <Markdown>{project.info}</Markdown>
                </div>
            )}
        </div>
    );
}
