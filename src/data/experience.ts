export const experiences: Experience[] = [
    {
        id: 1,
        title: 'Full Stack Developer',
        company: 'Atlantis Health',
        period: '08/2022 - Present',
        summary:
            'Full-stack application development for healthcare companies, employing agile methodologies for enhanced team collaboration and effective task prioritization.',
        description: [
            'Delivered full-stack applications for healthcare giants like Sanofi, Jazz Pharmaceuticals, and Novartis, utilizing agile methodologies and scrum for efficient team collaboration and task management.',
            'Spearheaded the development of a 25-page NextJs website, including a dashboard, account management, and static content, demonstrating proficiency in handling large-scale projects.',
            "Integrated IBM Watson's NLP capabilities into a patient treatment support application, leveraging RESTFul APIs, NextJs, and Tailwind CSS, leading to extended user engagement.",
            "Boosted legacy app's performance by 80% and introduced user authentication, personalization, reminders, and SMS features using Python, NextJs, Tailwind CSS, GraphQL, and MySQL.",
            'Accelerated CI/CD deploy times on AWS infrastructure by 200% and optimized development workflow through code-reviews and Python and Node.js automation scripts.',
            'Promoted effective teamwork with cross-functional teams using Asana, planning, and retrospective meetings, resulting in ahead-of-schedule project completion with minimal issues.',
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
        id: 2,
        title: 'Product Support Specialist',
        company: 'VantagePoint AI',
        period: '01/2021 - 11/2021',
        summary:
            'Provision of vital technical support for AI-based stock market prediction software, contributing to product stability and an improved user experience.',
        description: [
            'Acquired thorough knowledge of a software platform that uses AI to forecast stock market fluctuations.',
            'Identified and reported software bugs to the development team, enhancing product stability and user experience.',
            'Addressed Salesforce support tickets with exceptional customer service, maintaining timely and accurate records.',
            'Collaborated with Software Potential to manage customer information and licensing.',
            'Assisted users in troubleshooting software issues and created helpful knowledge base articles, which improved user satisfaction and engagement.',
        ],
        tags: ['Bug Reports', 'Salesforce', 'Software Potential'],
    },
    {
        id: 3,
        title: 'Entertainment Technician',
        company: 'Freelance',
        period: '03/2015 - 05/2022',
        summary:
            'Provided versatile technical and leadership roles in live event productions, offering solutions to on-site challenges and ensuring seamless performances.',
        description: [
            'Worked in various roles including stagehand, shop assistant, stage manager, lighting designer, and team lead across different event companies.',
            'Gained hands-on experience with new technologies and skills in entertainment tech, customer service, networking, electrical, carpentry, and more while working with new people and clients at each event.',
            'Directed and trained crews for events, resolving technical issues effectively and ensuring smooth performances.',
            'Contributed to various aspects of production, including set design, painting, electrics, building props and sets, operating the fly system during shows, focusing and gelling lights, light design, and programming/operating the lighting board.',
            'Guided problem-solving initiatives during productions to ensure smooth events.',
        ],
        tags: [
            'Leadership',
            'Project Planning',
            'Troubleshooting',
            'Hands-on Technical',
        ],
        extraTags: [
            'Networking',
            'Electrical',
            'Carpentry',
            'Lighting Design',
            'Stage Management',
            'Customer Service',
        ],
    },
];

// check ids are unique
const ids = experiences.map((e) => e.id);
const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
if (duplicates.length > 0) {
    throw new Error(`Duplicate ids found: ${duplicates.join(', ')}`);
}
