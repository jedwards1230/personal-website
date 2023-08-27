import Link from 'next/link';
import Image from 'next/image';

import Section from '@/components/Section';
import TagList from '@/components/Tag';
import { projects } from '@/data';
import { useMemo } from 'react';

export default function Projects() {
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
                        <Link
                            href={p.href}
                            target="_blank"
                            className="group grid w-full grid-cols-12 gap-1 rounded p-2 text-neutral-500 transition-all dark:text-neutral-400 lg:gap-4 hover:lg:bg-neutral-200/50 hover:lg:!opacity-100 group-hover/list:lg:opacity-50 hover:lg:dark:bg-neutral-800"
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
                        </Link>
                    );
                })}
            </div>
            <Link
                href="/projects"
                className="pt-6 text-center text-lg hover:underline md:pt-8"
            >
                View All Projects
            </Link>
        </Section>
    );
}
