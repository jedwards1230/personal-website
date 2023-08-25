import Section from '@/components/Section';

export default function Experience() {
    const experience = [
        {
            title: 'Full Stack Developer',
            company: 'Atlantis Health',
            period: '08/2021 - Present',
            description: [
                'Delivered full-stack applications for Sanofi, Jazz Pharmaceuticals, and Novartis using agile methodologies, scrum, and planning for effective team collaboration and task prioritization',
                'Led and developed a 25-page NextJs website including a dashboard, account management, and static content, showcasing the ability to work on large-scale projects',
                "Implemented IBM Watson's NLP capabilities for a patient treatment support application using RESTFul APIs, NextJs, Tailwind CSS, and Docker, resulting in lasting user engagements of up to 15 minutes",
                "Improved legacy app's performance by 80% and added user authentication, personalization, reminders, and SMS features using Python, NextJs, Tailwind CSS, GraphQL, and MySQL",
                'Streamlined CI/CD deploy times on AWS infrastructure by 200% and enhanced development workflow through code-reviews and Python and Node.js automation scripts',
                'Fostered effective teamwork with cross-functional teams using Asana, planning, and retrospective meetings, leading to projects completed ahead of schedule with minimal issues',
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
                'Maintained extensive knowledge of software platform that used AI to predict stock market changes',
                'Identified and reported bugs to development team, enhancing product stability and user experience',
                'Resolved Salesforce support tickets with exceptional customer service, providing timely and accurate records',
                'Coordinated with Software Potential to manage customer information and licensing',
                'Supported users in troubleshooting software issues, creating helpful knowledge base articles, improving user satisfaction and engagement',
            ],
            tags: ['Bug Reports', 'Salesforce', 'Software Potential'],
        },
        {
            title: 'Entertainment Technician',
            company: 'Freelance',
            period: '03/2015 - 05/2022',
            description: [
                'Led and trained crews for diverse events and resolved technical issues swiftly',
                'Steered problem-solving initiatives during productions, ensuring smooth events',
                'Participated in various aspects of production, including set design, painting, and electrics',
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
        </Section>
    );
}
