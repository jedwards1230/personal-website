'use client';

import clsx from 'clsx';
import { usePlausible } from 'next-plausible';

import TagList from '@/components/TagList';
import { Photo, Star } from './Icons';
import BackButton from './BackButton';
import { useNavigation } from '@/app/NavigationProvider';
import { useFilter } from '@/FilterProvider';
import Filters from './Filters';
import FilterPopover from './FilterPopover';

export default function ProjectList({
    projects,
    inline = false,
    modal = false,
}: {
    projects: Project[];
    inline?: boolean;
    modal?: boolean;
}) {
    const {
        filterCompany,
        filterClient,
        filterYear,
        filterTag,
        filterProjects,
    } = useFilter();

    const sortedProjects = projects
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
            // sort by client
            if (a.client > b.client) return 1;
            if (a.client < b.client) return -1;
            // sort by title
            if (a.title > b.title) return 1;
            if (a.title < b.title) return -1;
            return 0;
        })
        .filter(filterProjects);

    return (
        <>
            {!inline && (
                <>
                    <div className="sticky top-0 z-10 grid w-full grid-cols-12 bg-background pb-4 pt-4 text-center md:pb-2">
                        <BackButton modal={modal} intercept={true} />
                        <h2 className="col-span-4 select-none text-2xl">
                            Projects
                        </h2>
                        <div className="col-span-4 flex justify-end">
                            <FilterPopover />
                        </div>
                    </div>
                    <Filters />
                </>
            )}
            <div className="flex flex-col gap-2 pb-8 pt-4">
                {/* Projects */}
                {sortedProjects.map((p, i) =>
                    inline ? (
                        <ProjectListItem key={'project-' + i} project={p} />
                    ) : (
                        <ProjectListItem
                            key={'project-' + i}
                            project={p}
                            handleCompanyClick={filterCompany}
                            handleClientClick={filterClient}
                            handleYearClick={filterYear}
                            handleTagClick={filterTag}
                        />
                    ),
                )}
            </div>
        </>
    );
}

function ProjectListItem({
    project,
    handleCompanyClick,
    handleClientClick,
    handleYearClick,
    handleTagClick,
}: {
    project: Project;
    handleCompanyClick?: (company: string) => void;
    handleClientClick?: (company: string) => void;
    handleYearClick?: (year: number) => void;
    handleTagClick?: (tag: string) => void;
}) {
    const plausible = usePlausible();
    const { setCurrentProject } = useNavigation();

    return (
        <div
            className={clsx(
                'flex cursor-pointer flex-col rounded border border-transparent p-2 hover:border-border focus:bg-neutral-300/30 hover:sm:shadow-sm',
            )}
            onClick={
                project.info
                    ? () => {
                          setCurrentProject(project.id);
                          plausible('View Project', {
                              props: {
                                  project: project.title,
                              },
                          });
                      }
                    : undefined
            }
        >
            <div className="flex flex-col justify-between md:flex-row md:items-center">
                {/* Title */}
                <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold">
                        {project.title}
                    </span>
                    {project.images && <Photo />}
                    {project.favorite && <Star />}
                </div>

                {/* Client - Year */}
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {handleYearClick && handleClientClick ? (
                        <>
                            {project.client && (
                                <>
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
                                </>
                            )}
                            <button
                                className="md:hover:underline"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleCompanyClick(project.company);
                                }}
                            >
                                {project.company}
                            </button>{' '}
                            -{' '}
                            <button
                                className="md:hover:underline"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleYearClick(project.year);
                                }}
                            >
                                {project.month}/{project.year}
                            </button>
                        </>
                    ) : (
                        <>
                            {project.client ? project.client + ' - ' : ''}{' '}
                            {project.company} - {project.month}/{project.year}
                        </>
                    )}
                </p>
            </div>
            <div className="flex flex-col justify-between md:flex-row">
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
