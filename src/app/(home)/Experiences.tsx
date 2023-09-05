'use client';

import DownloadResume from '@/components/DownloadResume';
import Section from '@/components/Section';
import TagList from '@/components/TagList';
import { useNavigation } from '../NavigationProvider';
import { usePlausible } from 'next-plausible';

export default function Experience({
    experiences,
}: {
    experiences: Experience[];
}) {
    const plausible = usePlausible();
    const { setCurrentExperience } = useNavigation();

    return (
        <Section id="experience">
            <div className="flex flex-col gap-4">
                {experiences.map((e, i) => (
                    <div
                        className="grid w-full cursor-pointer grid-cols-12 gap-1 rounded p-2 text-neutral-500 transition-all hover:scale-105 hover:bg-neutral-200/50 hover:shadow-sm dark:text-neutral-400 hover:dark:bg-neutral-800 lg:gap-4"
                        key={'experience-' + i}
                        onClick={() => {
                            setCurrentExperience(e.id);
                            plausible('View Experience', {
                                props: {
                                    experience: e.title,
                                    company: e.company,
                                },
                            });
                        }}
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
                ))}
            </div>
            <DownloadResume />
        </Section>
    );
}
