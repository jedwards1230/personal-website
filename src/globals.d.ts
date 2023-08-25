type Section = 'about' | 'experience' | 'projects' | 'contact';

type Experience = {
    title: string;
    company: string;
    period: string;
    description: string[];
    tags: string[];
};

type Project = {
    title: string;
    description: string;
    href: string;
    tags: string[];
    preview: string;
};
