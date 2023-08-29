'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Section from '@/components/Section';
import TagList from '@/components/Tag';
import { projects } from '@/data';
import { useNavigation } from './NavigationProvider';
import clsx from 'clsx';

export default function Projects() {
    const { setCurrentProject } = useNavigation();
    const showcaseProjects = useMemo(() => {
        return projects.filter(
            (p) => p.showcase && p.showcase === true && p.img,
        );
    }, []);

    return (
        <Section id="projects">
            <div className="group/list flex flex-col gap-4">
                {showcaseProjects.map((p, i) => {
                    return (
                        <div
                            onClick={
                                p.info
                                    ? () => setCurrentProject(p.id)
                                    : undefined
                            }
                            className={clsx(
                                'group grid w-full grid-cols-12 gap-1 rounded p-2 text-neutral-500 transition-all dark:text-neutral-400 md:hover:bg-neutral-200/50 md:hover:!opacity-100 md:group-hover/list:opacity-50 md:hover:dark:bg-neutral-800 lg:gap-4',
                                p.info && 'cursor-pointer',
                            )}
                            key={'projects-' + i}
                        >
                            {/* Preview */}
                            <Image
                                width={800}
                                height={400}
                                src={p.img}
                                alt={'Preview ' + p.title + '.png'}
                                className="col-span-12 aspect-video w-full select-none rounded border bg-neutral-100 shadow-sm lg:col-span-4"
                            />
                            {/* Title */}
                            <div className="col-span-12 flex flex-col gap-1 lg:col-span-8">
                                <div className="font-medium text-neutral-950 dark:text-neutral-50">
                                    {p.title}
                                </div>
                                {/* Description */}
                                <div>{p.description}</div>
                                <TagList tags={p.tags} />
                            </div>
                        </div>
                    );
                })}
            </div>
            <Link
                href="/projects"
                scroll={false}
                className="select-none pt-8 text-center text-lg hover:underline"
            >
                View All Projects
            </Link>
        </Section>
    );
}
