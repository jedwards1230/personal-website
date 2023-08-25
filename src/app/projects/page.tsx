import Link from 'next/link';

import { personalProjects, professionalProjects } from '../data';
import TagList from '@/components/Tag';

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
        <div className="flex h-full w-full flex-col gap-12 px-4 pt-8 md:px-24 md:pt-16 lg:px-32">
            <div className="grid w-full grid-cols-12 text-center">
                <Link href="/" className="col-span-3 hover:underline">
                    Go Home
                </Link>
                <h2 className="col-span-6 text-2xl">Projects</h2>
            </div>
            <table className="w-full table-fixed border-collapse text-left">
                <thead>
                    <tr>
                        <th className="w-1/12">Year</th>
                        <th className="w-3/12 md:w-2/12">Title</th>
                        <th className="w-3/12 md:w-1/12">Made For</th>
                        <th className="hidden md:block md:w-5/12">Tags</th>
                        <th className="w-1/12 lg:w-3/12">Link</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedProjects.map((p, i) => {
                        return (
                            <tr className="border-y" key={i}>
                                <td className="py-2 text-sm text-neutral-500 dark:text-neutral-400">
                                    {p.year}
                                </td>
                                <td className="">{p.title}</td>
                                <td className="pr-1 text-sm text-neutral-500 dark:text-neutral-400">
                                    {p.client}
                                </td>
                                <td className="hidden py-2 md:block">
                                    <TagList tags={p.tags} />
                                </td>
                                <td>
                                    {p.href && p.hrefTitle ? (
                                        <Link
                                            target="_blank"
                                            className="text-sm text-neutral-500 hover:text-neutral-950 hover:underline dark:text-neutral-400 hover:dark:text-neutral-50"
                                            href={p.href}
                                        >
                                            <span className="hidden lg:block">
                                                {p.hrefTitle}
                                            </span>
                                            <span className="lg:hidden">
                                                Source
                                            </span>
                                        </Link>
                                    ) : (
                                        ''
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
