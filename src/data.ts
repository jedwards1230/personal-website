export const projects: Project[] = [
    {
        id: '1',
        year: 2023,
        month: 6,
        company: 'Atlantis Health',
        client: 'Sanofi',
        title: 'Patient Portal',
        showcase: true,
        favorite: true,
        images: ['/patientPortalPreview.png'],
        tags: [
            'TypeScript',
            'Python',
            'NextJS',
            'TailwindCSS',
            'AWS',
            'Playwright',
            'Figma',
        ],
        description: 'Patient Portal for managing treatment',
        info: `
# Goals

Build a patient portal for managing treatment.

# Motivations

Encourage patients to take an active role in their treatment.

- Track symptoms
- Track medication
- Track treatment
- Track progress

Connect with Health Care Providers

- Manage correspondence and appointments
- Manage prescriptions

Help patients live a healthier life

- Recipe list curated by medical professionals

Provide patients with a way to learn about their condition and treatment options.

- Articles and information curated by medical professionals
        `,
    },
    {
        id: '2',
        year: 2023,
        month: 8,
        company: 'Personal',
        title: 'ChatUI',
        href: 'https://github.com/jedwards1230/chat',
        showcase: true,
        favorite: true,
        images: [
            'https://raw.githubusercontent.com/jedwards1230/chat/main/screenshots/screenshot-0.png',
            'https://raw.githubusercontent.com/jedwards1230/chat/main/screenshots/screenshot-1.png',
        ],
        tags: [
            'TypeScript',
            'NextJS',
            'TailwindCSS',
            'OpenAI API',
            'Supabase',
            'Oauth',
        ],
        description: 'UI for managing chats with LLMs',
        info: `
# Goals

Build a daily-driver chat application leveraging the OpenAI API.

# Motivations

Using the OpenAI API means my data will not be used for training (more privacy).

It also means I pay per request rather than per month, which is cheaper for me.

# Features

- Edge Functions
- GitHub OAuth
- Supabase and Local Storage
    - Secure your key on the server or in your browser
    - Sync your conversations across devices
- Dark Mode
- Progressive Web App
- Chat personalities
    - Save system messages and function preferences per personality`,
    },
    {
        id: '3',
        year: 2022,
        month: 12,
        company: 'Atlantis Health',
        client: 'Sanofi',
        title: 'Adele',
        showcase: true,
        favorite: true,
        images: ['/adelePreview1.png', '/adelePreview2.png'],
        tags: [
            'TypeScript',
            'NextJS',
            'TailwindCSS',
            'IBM Watson',
            'AWS',
            'Playwright',
            'Figma',
        ],
        description: 'AI Powered Medication Assistant',
        info: `
# Goals

Rebuild the Adele application using NextJS, Typescript, and TailwindCSS.

# Motivations

The original application was built by multiple vendors and was difficult to maintain.

- Three separate codebases for a relatively simple application
    - Switching to NextJS resulted in a 80% reduction in code
- UI Frameworks came with a lot of bloat
    - Switching to TailwindCSS resulted in a 60% reduction in CSS
- Vanilla JS was used for everything
    - Switching to TypeScript prevents entire classes of bugs
    - It also makes the code easier to read and maintain

Update the conversation flow to be more natural and intuitive.

- Using IBM Watson's NLP capabilities, we can control the flow of the conversation
- Using a more intuitive Speech-to-Text interface, we can make the conversation more intuitive
- Using an updated model for the virtual assistant, we can make the assistant feel more friendly and human

# Features

Chat with AI powered virtual assistant

- Disucss treatment options
- Learn about your condition
- Learn about your medication
`,
    },
    {
        id: '4',
        year: 2022,
        month: 5,
        company: 'Personal',
        title: 'go-kerbal',
        href: 'https://github.com/jedwards1230/go-kerbal',
        showcase: true,
        favorite: true,
        images: [
            'https://raw.githubusercontent.com/jedwards1230/go-kerbal/main/extras/screenshots/main.png',
            'https://raw.githubusercontent.com/jedwards1230/go-kerbal/main/extras/screenshots/modInfo.png',
            'https://raw.githubusercontent.com/jedwards1230/go-kerbal/main/extras/screenshots/queue.png',
            'https://raw.githubusercontent.com/jedwards1230/go-kerbal/main/extras/screenshots/options.png',
            'https://raw.githubusercontent.com/jedwards1230/go-kerbal/main/extras/screenshots/logs.png',
        ],
        tags: ['Go', 'CLI', 'BubbleTea'],
        description: 'CLI for managing Kerbal Space Program mods',
        info: `
# Goals

Build a CLI for managing Kerbal Space Program mods.

# Motivations

I wanted to learn Go and I wanted to make it easier to manage mods for Kerbal Space Program.

This was inspired by the [KSP CKAN](https://github.com/KSP-CKAN/CKAN) project and uses their metadata.

# Features

- Install mods
- Uninstall mods
- Update mods
- List mods
- Search mods
- List installed mods
- Ensure mod dependencies are met
- Ensure mod conflicts are resolved
        `,
    },
    {
        id: '5',
        year: 2023,
        month: 6,
        company: 'Personal',
        title: 'SearchAI',
        href: 'https://github.com/jedwards1230/search',
        images: [
            'https://raw.githubusercontent.com/jedwards1230/search/main/home.png',
            'https://raw.githubusercontent.com/jedwards1230/search/main/results.png',
        ],
        tags: [
            'TypeScript',
            'NextJS',
            'TailwindCSS',
            'OpenAI API',
            'Langchain',
            'Supabase',
        ],
        description: 'AI assisted search engine',
        info: `
# Goals

Build a search engine leveraging the OpenAI API.

# Motivations

Inspired by the original [Phind](https://phind.com/), I wanted to build a replica that used my own API key.

# Features

- Use search results to built context for chat with LLM
- Summarize data form each source
- Advanced web scraping for more relevant results
- Edge Functions
- Supabase (pgvector)
- OpenAI API
- Langchain
- Progressive Web App
- Dark Mode
`,
    },
    {
        id: '6',
        year: 2022,
        month: 11,
        company: 'Atlantis Health',
        client: 'Novartis',
        title: 'Learning Modules',
        tags: ['TypeScript', 'React', 'TailwindCSS', 'Playwright', 'Figma'],
        description: 'Linear Learning Modules for Patients',
        info: `
# Goals

Build a learning module system for patients to learn how to talk to their doctor about their condition.

# Motivations

Giving patients the tools they need to have a productive conversation with their doctor is a key part of our mission.

# Features

- Linear Learning Modules
- Animated pages
- Export list of questions and symptoms to PDF
        `,
    },
    {
        id: '7',
        year: 2023,
        month: 7,
        company: 'Atlantis Health',
        client: 'Jazz Pharmaceuticals',
        title: 'Email Templates',
        tags: ['HTML', 'CSS', 'Figma'],
        description: 'Email Templates for Patient Outreach',
        info: `
# Goals

Build a set of email templates for patient outreach.

# Motivations

Provide patients with a way to learn about their condition and treatment options.

# Features

- Responsive Emails
- Customizable Templates
- Backwards Compatible to HTML3
        `,
    },
    {
        id: '8',
        year: 2023,
        month: 8,
        company: 'Atlantis Health',
        client: 'Bristol Myers Squibb',
        title: 'Static Pages',
        description: 'Static Pages for Patient Outreach, Marketing, and Sales',
        info: `
# Goals

Build a set of static pages for patient outreach, marketing, and sales.

# Motivations

Provide patients with a way to learn about their condition and treatment options.

# Features

- Responsive Pages
- Animated sections for increased engagement
        `,
        tags: ['HTML', 'TailwindCSS', 'TypeScript', 'Figma'],
    },
    {
        id: '9',
        year: 2023,
        month: 8,
        company: 'Personal',
        title: 'Personal Website',
        href: 'https://github.com/jedwards1230/personal-website',
        images: [
            'https://raw.githubusercontent.com/jedwards1230/personal-website/main/screenshot.png',
        ],
        tags: ['TypeScript', 'NextJS', 'TailwindCSS', 'shadcn/ui'],
        description: 'My corner of the internet',
        info: `
# Goals

Build a personal website to showcase my projects and experience.

# Motivations

I wanted to make use of the latest web technologies and build something I could be proud of.

I also wanted a reliable place to store information about all of my work.

# Features

- NextJS
    - /app directory for server-side rendering
    - Intercepted Routes
    - Edge Functions
- TypeScript
- Intersection Observer
- TailwindCSS
    - Dark Mode
- Postgres
    - Store messages left by visitors
        `,
    },
    {
        id: '10',
        year: 2022,
        month: 8,
        company: 'Personal',
        title: 'Cars',
        description: 'A small game for learning ML basics',
        info: `
# Goals

Build a game frontend for learning ML basics.

# Motivations

I wanted to build intuition for how neural networks work and build a 2D game.

# Features

- 2D Driving Simulator
- Training Mode
    - Teach car to drive / let it teach itself
- Inference Mode
    - Watch car drive
- Save / Load Models
- View Model Details
- View Training History
- View Model Architecture
- View Model Stats
- nnjs library
        `,
        href: 'https://github.com/jedwards1230/cars',
        tags: ['TypeScript', 'NextJS', 'Material UI', 'Machine Learning'],
    },
    {
        id: '11',
        year: 2022,
        month: 8,
        company: 'Personal',
        title: 'nnjs',
        description: 'A small library for learning ML basics',
        info: `
# Goals

Learn how to implement a neural network from scratch.

# Motivations

I wanted to build intuition for how neural networks work.

# Features

- Neural Network Class
- Stochastic Gradient Descent
- Backpropagation
- Activation Functions
- Various Training Methods
        `,
        href: 'https://github.com/jedwards1230/nnjs',
        tags: ['TypeScript', 'Machine Learning'],
    },
    {
        id: '12',
        year: 2022,
        month: 8,
        company: 'Personal',
        title: 'Leetcode Timer',
        description: 'Firefox extension for timing LeetCode problems',
        info: `
# Goals

Build a browser extension for timing LeetCode problems.

# Motivations

I wanted to learn how to build browser extensions and Leetcode did not have built-in PR tracking.

# Features

- Track time spent on each problem
- Track average time spent on each problem
        `,
        href: 'https://github.com/jedwards1230/leetcode-timer',
        tags: ['TypeScript', 'HTML', 'CSS', 'Webpack', 'Browser Extensions'],
        images: [
            'https://raw.githubusercontent.com/jedwards1230/leetcode-timer/main/screenshot.png',
        ],
    },
    {
        id: '13',
        year: 2022,
        month: 8,
        company: 'Personal',
        title: 'Daily arXiv',
        description: 'Quickly browse ArXiv by date and subject',
        info: `
# Goals

Build a website for quickly browsing ArXiv by date and subject.

# Motivations

I wanted to learn NextJS and I wanted a good way to keep up with the latest papers.

# Features

- Browse ArXiv by date and subject
        `,
        href: 'https://github.com/jedwards1230/dailyarxiv',
        tags: ['TypeScript', 'NextJS', 'TailwindCSS'],
    },
];

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
