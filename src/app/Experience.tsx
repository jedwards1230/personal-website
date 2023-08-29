'use client';

import DownloadResume from '@/components/DownloadResume';
import Section from '@/components/Section';
import TagList from '@/components/Tag';
import { experiences } from '../data';
import { useNavigation } from './NavigationProvider';

export default function Experience() {
    const { setCurrentExperience } = useNavigation();

    return (
        <Section id="experience">
            <div className="group/list flex flex-col gap-4">
                {experiences.map((e, i) => {
                    return (
                        <div
                            className="group grid w-full cursor-pointer grid-cols-12 gap-1 rounded p-2 text-neutral-500 transition-all hover:scale-105 hover:bg-neutral-200/50 hover:shadow-sm dark:text-neutral-400 hover:dark:bg-neutral-800 hover:md:!opacity-100 group-hover/list:md:opacity-50 lg:gap-4"
                            key={'experience-' + i}
                            onClick={() => setCurrentExperience(e.id)}
                        >
                            {/* Period */}
                            <time className="col-span-12 whitespace-nowrap text-sm lg:col-span-4">
                                {e.period}
                            </time>

                            <div className="col-span-12 flex flex-col gap-1 lg:col-span-8">
                                {/* Title */}
                                <div className="font-medium text-neutral-950 dark:text-neutral-50">
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
                    );
                })}
            </div>
            <DownloadResume />
        </Section>
    );
}
