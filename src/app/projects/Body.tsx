'use client';

import Link from 'next/link';
import { useState } from 'react';

import { showcaseProjects, professionalProjects } from '../data';
import TagList, { FilterTag } from '@/components/Tag';
import { NewTab } from '../Icons';

export default function Body() {
    const [companyFilter, setCompanyFilter] = useState<string[]>([]);
    const [yearFilter, setYearFilter] = useState<number[]>([]);
    const [tagFilter, setTagFilter] = useState<string[]>([]);

    const handleCompanyClick = (company: string) => {
        setCompanyFilter([...companyFilter, company]);
    };

    const handleYearClick = (year: number) => {
        setYearFilter([...yearFilter, year]);
    };

    const handleTagClick = (tag: string) => {
        setTagFilter([...tagFilter, tag]);
    };

    const sortedProjects = [...showcaseProjects, ...professionalProjects]
        .sort((a, b) => {
            // sort by year, most recent first
            if (a.year > b.year) return -1;
            if (a.year < b.year) return 1;
            if (a.year === b.year) {
                // sort to put personal projects last within their year
                if (a.client === 'Personal') return 1;
                if (b.client === 'Personal') return -1;
            }
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
        <div className="flex h-full min-h-screen w-full flex-col gap-2 px-4 pt-8 sm:px-8 md:gap-8 md:px-16 md:pt-16 lg:px-32">
            <div className="sticky top-0 z-10 grid w-full grid-cols-12 bg-neutral-50/50 py-2 text-center backdrop-blur dark:bg-neutral-950/30">
                <Link
                    href="/"
                    className="col-span-4 flex items-center pl-2 hover:underline"
                >
                    Go Home
                </Link>
                <h2 className="col-span-4 text-2xl">Projects</h2>
            </div>
            <div className="flex flex-col gap-4 pb-8">
                {/* Filters */}
                <div className="flex h-8 flex-wrap justify-center gap-2 pt-1">
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

                {/* Projects */}
                {sortedProjects.map((p, i) => (
                    <Project
                        key={i}
                        project={p}
                        handleClientClick={handleCompanyClick}
                        handleYearClick={handleYearClick}
                        handleTagClick={handleTagClick}
                    />
                ))}
            </div>
        </div>
    );
}

function Project({
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
    return (
        <div className="flex flex-col p-2">
            <div className="flex flex-col justify-between md:flex-row md:items-center">
                {/* Title */}
                {project.href && project.hrefTitle ? (
                    <Link
                        target="_blank"
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
                        onClick={() => handleClientClick(project.client)}
                    >
                        {project.client}
                    </button>{' '}
                    -{' '}
                    <button
                        className="md:hover:underline"
                        onClick={() => handleYearClick(project.year)}
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
