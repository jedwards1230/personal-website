'use client';

import { usePlausible } from 'next-plausible';

import DownloadResume from '@/components/DownloadResume';
import Section from '@/components/Section';
import TagList from '@/components/TagList';
import ExperienceDialog from '@/components/dialogs/ExperienceDialog';

export default function Experience({
    experiences,
    projects,
}: {
    experiences: Experience[];
    projects: Project[];
}) {
    const plausible = usePlausible();

    return (
        <Section id="history">
            <div className="flex flex-col gap-4">
                {experiences.map((e, i) => (
                    <ExperienceDialog
                        experience={e}
                        projects={projects.filter(
                            (p) => p.company === e.company,
                        )}
                        key={'experience-' + i}
                    >
                        <div
                            className="grid w-full cursor-pointer grid-cols-12 gap-1 rounded p-2 text-left text-neutral-500 transition-all hover:scale-105 hover:bg-neutral-200/50 hover:shadow-sm dark:text-neutral-400 hover:dark:bg-neutral-800 lg:gap-4"
                            onClick={() =>
                                plausible('View Experience', {
                                    props: {
                                        experience: e.title,
                                        company: e.company,
                                    },
                                })
                            }
                        >
                            {/* Period */}
                            <time className="col-span-12 whitespace-nowrap text-sm lg:col-span-4">
                                {e.period}
                            </time>

                            <div className="col-span-12 flex flex-col gap-1 lg:col-span-8">
                                {/* Title */}
                                <div className="font-medium text-foreground">
                                    {e.title} - {e.company}
                                </div>

                                {/* Description */}
                                <ul className="list-inside list-disc text-sm">
                                    {e.summary}
                                </ul>

                                {/* Skills */}
                                <TagList tags={e.tags} />
                            </div>
                        </div>
                    </ExperienceDialog>
                ))}
            </div>
            <DownloadResume />
        </Section>
    );
}
