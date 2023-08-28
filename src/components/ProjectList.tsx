'use client';

import Link from 'next/link';
import { useState } from 'react';

import { projects } from '@/data';
import TagList, { FilterTag } from '@/components/Tag';
import { NewTab } from '../app/Icons';
import BackButton from './BackButton';
import { useNavigation } from '@/app/NavigationProvider';
import clsx from 'clsx';

const PROJECT_CARD_ENABLED = false;

export default function ProjectList({ modal = false }: { modal?: boolean }) {
    const [companyFilter, setCompanyFilter] = useState<string[]>([]);
    const [yearFilter, setYearFilter] = useState<number[]>([]);
    const [tagFilter, setTagFilter] = useState<string[]>([]);

    const handleCompanyClick = (company: string) => {
        if (companyFilter.includes(company)) return;
        setCompanyFilter([...companyFilter, company]);
    };

    const handleYearClick = (year: number) => {
        if (yearFilter.includes(year)) return;
        setYearFilter([...yearFilter, year]);
    };

    const handleTagClick = (tag: string) => {
        if (tagFilter.includes(tag)) return;
        setTagFilter([...tagFilter, tag]);
    };

    const sortedProjects = projects
        .sort((a, b) => {
            // sort by year, most recent first
            if (a.year > b.year) return -1;
            if (a.year < b.year) return 1;
            // sort by month, most recent first
            if (a.month > b.month) return -1;
            if (a.month < b.month) return 1;
            // sort by client
            if (a.client > b.client) return 1;
            if (a.client < b.client) return -1;
            // sort by title
            if (a.title > b.title) return 1;
            if (a.title < b.title) return -1;
            return 0;
        })
        .filter((p) => {
            // filter by company
            if (companyFilter.length > 0 && !companyFilter.includes(p.client))
                return false;
            // filter by year
            if (yearFilter.length > 0 && !yearFilter.includes(p.year))
                return false;
            // filter by tag
            if (
                tagFilter.length > 0 &&
                !tagFilter.every((t) => p.tags.includes(t))
            ) {
                return false;
            }

            return true;
        });

    return (
        <>
            <div className="sticky top-0 z-10 grid w-full grid-cols-12 bg-neutral-50/80 pb-4 pt-4 text-center backdrop-blur dark:bg-neutral-950/90 md:pb-2">
                <BackButton modal={modal} intercept={true} />
                <h2 className="col-span-4 text-2xl">Projects</h2>
            </div>
            <div>
                <div className="flex w-full justify-center text-neutral-400">
                    Select details to filter
                </div>
                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-2 pt-1">
                    {companyFilter.map((c, i) => (
                        <FilterTag
                            key={'company-' + i}
                            tag={c}
                            onClick={() =>
                                setCompanyFilter(
                                    companyFilter.filter((f) => f !== c),
                                )
                            }
                        />
                    ))}
                    {yearFilter.map((y, i) => (
                        <FilterTag
                            key={'year-' + i}
                            tag={y.toString()}
                            onClick={() =>
                                setYearFilter(yearFilter.filter((f) => f !== y))
                            }
                        />
                    ))}
                    {tagFilter.map((t, i) => (
                        <FilterTag
                            key={'tag-' + i}
                            tag={t}
                            onClick={() =>
                                setTagFilter(tagFilter.filter((f) => f !== t))
                            }
                        />
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-4 pb-8 pt-4">
                {/* Projects */}
                {sortedProjects.map((p, i) => (
                    <ProjectListItem
                        key={'project-' + i}
                        project={p}
                        handleClientClick={handleCompanyClick}
                        handleYearClick={handleYearClick}
                        handleTagClick={handleTagClick}
                    />
                ))}
            </div>
        </>
    );
}

function ProjectListItem({
    project,
    handleClientClick,
    handleYearClick,
    handleTagClick,
}: {
    project: Project;
    handleClientClick: (company: string) => void;
    handleYearClick: (year: number) => void;
    handleTagClick: (tag: string) => void;
}) {
    const { setCurrentProject } = useNavigation();

    return (
        <div
            className={clsx(
                'flex flex-col p-2 focus:bg-neutral-300/30 hover:dark:sm:border-neutral-700',
                PROJECT_CARD_ENABLED &&
                    'cursor-pointer rounded border border-transparent hover:sm:border-neutral-300 hover:sm:shadow-sm',
            )}
            onClick={
                PROJECT_CARD_ENABLED
                    ? () => setCurrentProject(project.id)
                    : undefined
            }
        >
            <div className="flex flex-col justify-between md:flex-row md:items-center">
                {/* Title */}
                {project.href ? (
                    <Link
                        target="_blank"
                        scroll={false}
                        className="group flex gap-2 text-lg font-semibold hover:underline"
                        href={project.href}
                    >
                        {project.title}
                        <span className="text-neutral-500 group-hover:text-neutral-950 dark:text-neutral-400 group-hover:dark:text-neutral-50">
                            <NewTab />
                        </span>
                    </Link>
                ) : (
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                )}

                {/* Client - Year */}
                <p className="text-neutral-500 dark:text-neutral-400">
                    <button
                        className="md:hover:underline"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClientClick(project.client);
                        }}
                    >
                        {project.client}
                    </button>{' '}
                    -{' '}
                    <button
                        className="md:hover:underline"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleYearClick(project.year);
                        }}
                    >
                        {project.year}
                    </button>
                </p>
            </div>
            <div className="flex flex-col justify-between md:flex-row">
                {/* Description */}
                <p>{project.description}</p>
                {/* Tags */}
                <TagList
                    tags={project.tags}
                    className="md:justify-end"
                    handleTagClick={handleTagClick}
                />
            </div>
        </div>
    );
}
