type Section = 'about' | 'experience' | 'projects' | 'contact';

type Experience = {
    title: string;
    company: string;
    period: string;
    description: string[];
    tags: string[];
};

type Project = {
    year: number;
    client: string;
    title: string;
    description: string;
    href?: string;
    hrefTitle?: string;
    tags: string[];
    img?: string;
};
