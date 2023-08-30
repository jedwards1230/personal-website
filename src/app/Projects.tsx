'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePlausible } from 'next-plausible';

import Section from '@/components/Section';
import TagList from '@/components/TagList';
import { projects } from '@/data';
import { useNavigation } from './NavigationProvider';

export default function Projects() {
    const plausible = usePlausible();
    const { setCurrentProject } = useNavigation();
    const showcaseProjects = useMemo(() => {
        return projects.filter(
            (p) => p.showcase && p.showcase === true && p.img,
        );
    }, []);

    return (
        <Section id="projects">
            <div className="flex flex-col gap-4">
                {showcaseProjects.map((p, i) => (
                    <div
                        onClick={() => {
                            setCurrentProject(p.id);
                            plausible('View Project', {
                                props: {
                                    project: p.title,
                                    showCase: true,
                                },
                            });
                        }}
                        className="grid w-full cursor-pointer grid-cols-12 gap-1 rounded p-2 text-neutral-500 transition-all hover:scale-105 hover:bg-neutral-200/50 dark:text-neutral-400 hover:dark:bg-neutral-800 lg:gap-4"
                        key={'projects-' + i}
                    >
                        {/* Preview */}
                        <Image
                            width={800}
                            height={400}
                            src={p.img}
                            alt={'Preview ' + p.title + '.png'}
                            className="col-span-12 aspect-video w-full select-none rounded border border-border bg-neutral-100 shadow-sm lg:col-span-4"
                        />
                        {/* Title */}
                        <div className="col-span-12 flex flex-col gap-1 lg:col-span-8">
                            <div className="font-medium text-foreground">
                                {p.title}
                            </div>
                            {/* Description */}
                            <div>{p.description}</div>
                            <TagList tags={p.tags} />
                        </div>
                    </div>
                ))}
            </div>
            <Link
                href="/projects"
                scroll={false}
                onClick={() => plausible('View All Projects')}
                className="select-none pt-8 text-center text-lg hover:underline"
            >
                View All Projects
            </Link>
        </Section>
    );
}
