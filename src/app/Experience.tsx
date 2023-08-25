import Link from 'next/link';

import Section from '@/components/Section';
import { NewTab } from './Icons';

export default function Experience() {
    const experience: Experience[] = [
        {
            title: 'Full Stack Developer',
            company: 'Atlantis Health',
            period: '08/2021 - Present',
            description: [
                'Delivered full-stack applications for multiple clients using agile methodologies and led the development of a large-scale NextJs website.',
                "Implemented IBM Watson's NLP capabilities in a patient treatment support application and improved legacy app performance significantly.",
                'Enhanced CI/CD deploy times on AWS infrastructure and fostered effective teamwork leading to projects completion ahead of schedule.',
            ],
            tags: [
                'TypeScript',
                'NextJs',
                'Python',
                'SQL',
                'AWS',
                'TailwindCSS',
                'IBM Watson',
                'Asana',
            ],
        },
        {
            title: 'Product Support Specialist',
            company: 'VantagePoint AI',
            period: '01/2021 - 11/2021',
            description: [
                'Maintained knowledge of AI software platform and identified bugs, enhancing product stability.',
                'Resolved support tickets with exceptional customer service and coordinated with Software Potential for customer info management.',
                'Assisted users in troubleshooting software issues and created helpful knowledge base articles.',
            ],
            tags: ['Bug Reports', 'Salesforce', 'Software Potential'],
        },
        {
            title: 'Entertainment Technician',
            company: 'Freelance',
            period: '03/2015 - 05/2022',
            description: [
                'Led and trained crews for events and resolved technical issues.',
                'Steered problem-solving initiatives during productions to ensure smooth events.',
                'Participated in various aspects of production.',
            ],
            tags: ['Leadership', 'Project Planning', 'Troubleshooting'],
        },
    ];

    return (
        <Section id="experience">
            <div className="group/list flex flex-col gap-4">
                {experience.map((e, i) => {
                    return (
                        <div
                            className="group grid w-full grid-cols-12 gap-1 rounded p-2 text-neutral-500 transition-all dark:text-neutral-400 lg:gap-4 hover:lg:bg-neutral-100 hover:lg:!opacity-100 group-hover/list:lg:opacity-50 hover:lg:dark:bg-neutral-800"
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
                                <div className="flex flex-wrap gap-2 pt-1 text-xs">
                                    {e.tags.map((t, i) => {
                                        return (
                                            <span
                                                key={'experience-' + i}
                                                className="rounded-full bg-blue-200 px-2.5 py-1 font-medium text-blue-700 dark:text-blue-900"
                                            >
                                                {t}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <Link
                href="/Justin Edwards - Resume.pdf"
                target="_blank"
                className="inline-flex gap-2 pt-4 hover:underline"
            >
                View Full Resume <NewTab />
            </Link>
        </Section>
    );
}
