type Section = 'about' | 'experience' | 'projects' | 'contact';

type Experience = {
    title: string;
    company: string;
    period: string;
    description: string[];
    tags: string[];
};

type Project = {
    id: string;
    year: number;
    month: number;
    client: string;
    title: string;
    description: string;
    href?: string;
    tags: string[];
    showcase?: boolean;
    img?: string;
};
