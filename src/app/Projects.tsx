import Link from 'next/link';
import Image from 'next/image';

import Section from '@/components/Section';
import TagList from '@/components/Tag';
import { projects } from './data';

export default function Projects() {
    return (
        <Section id="projects">
            <div className="group/list flex flex-col gap-4">
                {projects.map((p, i) => {
                    return (
                        <Link
                            href={p.href}
                            target="_blank"
                            className="group grid w-full grid-cols-12 gap-1 rounded p-2 text-neutral-500 transition-all dark:text-neutral-400 lg:gap-4 hover:lg:bg-neutral-100 hover:lg:!opacity-100 group-hover/list:lg:opacity-50 hover:lg:dark:bg-neutral-800"
                            key={'projects-' + i}
                        >
                            {/* Preview */}
                            <Image
                                width={800}
                                height={400}
                                src={p.preview}
                                alt={'Preview ' + p.title + '.png'}
                                className="col-span-12 aspect-video w-full select-none bg-neutral-100 lg:col-span-4"
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
        </Section>
    );
}
