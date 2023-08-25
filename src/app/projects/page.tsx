import Link from 'next/link';

import { personalProjects, professionalProjects } from '../data';
import TagList from '@/components/Tag';
import { NewTab } from '../Icons';

export default function Page() {
    const sortedProjects = [...personalProjects, ...professionalProjects].sort(
        (a, b) => {
            // sort by year, most recent first
            if (a.year > b.year) return -1;
            if (a.year < b.year) return 1;
            if (a.year === b.year) {
                // sort to put personal projects last within their year
                if (a.client === 'Personal') return 1;
                if (b.client === 'Personal') return -1;
            }
            return 0;
        },
    );

    return (
        <div className="flex h-full min-h-screen w-full flex-col gap-8 px-4 pt-8 sm:px-8 md:gap-12 md:px-16 md:pt-16 lg:px-32">
            <div className="sticky top-0 z-10 grid w-full grid-cols-12 bg-neutral-50 py-2 text-center">
                <Link
                    href="/"
                    className="col-span-3 flex items-center pl-2 hover:underline"
                >
                    Go Home
                </Link>
                <h2 className="col-span-6 text-2xl">Projects</h2>
            </div>
            <div className="space-y-2 pb-8">
                {sortedProjects.map((p, i) => {
                    return (
                        <div key={i} className="flex flex-col p-2">
                            <div className="flex flex-col justify-between md:flex-row md:items-center">
                                {/* Title */}
                                {p.href && p.hrefTitle ? (
                                    <Link
                                        target="_blank"
                                        className="group flex gap-2 text-lg font-semibold hover:underline"
                                        href={p.href}
                                    >
                                        {p.title}
                                        <span className="text-neutral-500 group-hover:text-neutral-950 dark:text-neutral-400 group-hover:dark:text-neutral-50">
                                            <NewTab />
                                        </span>
                                    </Link>
                                ) : (
                                    <h3 className="text-lg font-semibold">
                                        {p.title}
                                    </h3>
                                )}

                                {/* Client - Year */}
                                <p className="text-neutral-500 dark:text-neutral-400">
                                    {p.client} - {p.year}
                                </p>
                            </div>
                            <div className="flex flex-col justify-between md:flex-row">
                                {/* Description */}
                                <p>{p.description}</p>
                                {/* Tags */}
                                <TagList
                                    tags={p.tags}
                                    className="md:justify-end"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
