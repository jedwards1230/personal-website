import DownloadResume from '@/components/DownloadResume';
import Section from '@/components/Section';
import TagList from '@/components/Tag';
import { experience } from '../data';

export default function Experience() {
    return (
        <Section id="experience">
            <div className="group/list flex flex-col gap-4">
                {experience.map((e, i) => {
                    return (
                        <div
                            className="group grid w-full grid-cols-12 gap-1 rounded p-2 text-neutral-500 transition-all hover:shadow-sm dark:text-neutral-400 lg:gap-4 hover:lg:bg-neutral-200/50 hover:lg:!opacity-100 group-hover/list:lg:opacity-50 hover:lg:dark:bg-neutral-800"
                            key={'experience-' + i}
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
                                    {e.description.map((d, i) => {
                                        return (
                                            <li key={'experience-' + i}>{d}</li>
                                        );
                                    })}
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
