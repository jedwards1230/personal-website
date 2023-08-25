type Section = 'about' | 'experience' | 'projects' | 'contact';

type Experience = {
    title: string;
    company: string;
    period: string;
    description: string[];
    tags: string[];
};
