'use client';

import clsx from 'clsx';
import { usePlausible } from 'next-plausible';

import TagList from '@/components/TagList';
import { Photo, Star } from './Icons';
import BackButton from './buttons/BackButton';
import { useFilter } from '@/app/FilterProvider';
import Filters from './Filters';
import FilterPopover from './FilterPopover';
import ProjectDialog from './dialogs/ProjectDialog';
import { useMemo } from 'react';

export default function ProjectList({
    projects,
    inline = false,
    modal = false,
}: {
    projects: Project[];
    inline?: boolean;
    modal?: boolean;
}) {
    const { filterCompany, filterYear, filterTag, filterProjects } =
        useFilter();

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
        <>
            {!inline && (
                <>
                    <div className="grid w-full grid-cols-12 pb-4 pt-4 text-center md:pb-2">
                        <div className="col-span-4 flex items-center">
                            {!modal && <BackButton />}
                        </div>
                        <h2 className="col-span-4 select-none text-2xl">
                            Projects
                        </h2>
                        <div className="col-span-4 flex justify-end">
                            <FilterPopover projects={projects} />
                        </div>
                    </div>
                    <Filters />
                </>
            )}
            <div className="flex flex-col gap-2 pb-8 pt-4">
                {/* Projects */}
                {sortedProjects.map((p) => (
                    <ProjectDialog project={p} key={p.id}>
                        <ProjectListItem
                            project={p}
                            handleCompanyClick={
                                !inline ? filterCompany : undefined
                            }
                            handleYearClick={!inline ? filterYear : undefined}
                            handleTagClick={!inline ? filterTag : undefined}
                        />
                    </ProjectDialog>
                ))}
            </div>
        </>
    );
}

function ProjectListItem({
    project,
    handleCompanyClick,
    handleYearClick,
    handleTagClick,
}: {
    project: Project;
    handleCompanyClick?: (company: string) => void;
    handleYearClick?: (year: number) => void;
    handleTagClick?: (tag: string) => void;
}) {
    const plausible = usePlausible();

    const viewProject = () =>
        plausible('View Project', {
            props: {
                project: project.title,
            },
        });

    return (
        <div
            className={clsx(
                'flex cursor-pointer flex-col rounded border border-transparent p-2 hover:border-border focus:bg-neutral-300/30 hover:sm:shadow-sm',
            )}
            onClick={project.info ? viewProject : undefined}
        >
            <div className="flex flex-col justify-between text-left md:flex-row md:items-center">
                {/* Title */}
                <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold">
                        {project.title}
                    </span>
                    {project.images.length > 0 && <Photo />}
                    {project.favorite && <Star />}
                </div>

                {/* Client - Year */}
                <div className="text-sm text-neutral-500 dark:text-neutral-400">
                    <span
                        className={clsx(
                            'cursor-pointer',
                            handleCompanyClick && 'md:hover:underline',
                        )}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!handleCompanyClick) return;
                            handleCompanyClick(project.company);
                        }}
                    >
                        {project.company}
                    </span>{' '}
                    -{' '}
                    <span
                        className={clsx(
                            'cursor-pointer',
                            handleYearClick && 'md:hover:underline',
                        )}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!handleYearClick) return;
                            handleYearClick(project.year);
                        }}
                    >
                        {project.month}/{project.year}
                    </span>
                </div>
            </div>
            <div className="flex flex-col justify-between text-left md:flex-row">
                {/* Description */}
                <p>{project.description}</p>
                {/* Tags */}
                <TagList
                    tags={project.tags}
                    className="md:justify-end"
                    onClick={handleTagClick}
                />
            </div>
        </div>
    );
}
