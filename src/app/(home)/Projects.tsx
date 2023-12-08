'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { usePlausible } from 'next-plausible';

import Section from '@/components/Section';
import TagList from '@/components/TagList';
import ProjectDialog from '@/components/dialogs/ProjectDialog';
import { useFilter } from '../FilterProvider';
import FilterPopover from '@/components/FilterPopover';
import Filters from '@/components/Filters';

export default function Projects({ projects }: { projects: Project[] }) {
    const plausible = usePlausible();

    const { filterProjects } = useFilter();

    const sortedProjects = useMemo(
        () =>
            projects
                .sort((a, b) => {
                    // sort by year, most recent first
                    if (a.year > b.year) return -1;
                    if (a.year < b.year) return 1;
                    // sort by month, most recent first
                    if (a.month > b.month) return -1;
                    if (a.month < b.month) return 1;
                    // sort by favorite
                    if (a.favorite && !b.favorite) return -1;
                    if (!a.favorite && b.favorite) return 1;
                    // sort by company
                    if (a.company > b.company) return 1;
                    if (a.company < b.company) return -1;
                    // sort by title
                    if (a.title > b.title) return 1;
                    if (a.title < b.title) return -1;
                    return 0;
                })
                .filter(filterProjects),
        [projects, filterProjects],
    );

    return (
        <Section id="projects">
            <div className="grid grid-cols-12 items-center">
                <Filters className="col-span-10 col-start-2" />
                <div className="col-span-1 flex justify-end">
                    <FilterPopover projects={projects} />
                </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
                {sortedProjects.map((p, i) => (
                    <ProjectDialog
                        project={p}
                        className="col-span-6 sm:col-span-4 lg:col-span-3"
                        key={'projects-' + i}
                    >
                        <div
                            onClick={() =>
                                plausible('View Project', {
                                    props: {
                                        project: p.title,
                                        showCase: true,
                                    },
                                })
                            }
                            className="flex h-full w-full cursor-pointer flex-col gap-2 rounded p-2 text-left text-neutral-500 transition-all hover:scale-105 hover:bg-neutral-200/50 dark:text-neutral-400 hover:dark:bg-neutral-800"
                        >
                            {/* Preview */}
                            {p.images[0] ? (
                                <Image
                                    width={800}
                                    height={400}
                                    src={p.images[0]}
                                    alt={'Preview ' + p.title + '.png'}
                                    className="h-40 w-full select-none rounded border border-border bg-neutral-100 shadow-sm"
                                />
                            ) : (
                                <div className="flex h-40 w-full select-none items-center justify-center rounded border border-border bg-background text-foreground shadow-sm">
                                    {p.title}
                                </div>
                            )}
                            {/* Title */}
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center justify-between font-medium text-foreground">
                                    {p.title}
                                    {p.company !== 'Personal' && (
                                        <div className="text-sm text-blue-400">
                                            @{p.company}
                                        </div>
                                    )}
                                </div>
                                {/* Description */}
                                <div>{p.description}</div>

                                <TagList tags={p.tags} />
                            </div>
                        </div>
                    </ProjectDialog>
                ))}
            </div>
        </Section>
    );
}
