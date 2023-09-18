type Section = 'about' | 'history' | 'projects' | 'contact';

type Experience = {
    id: number;
    title: string;
    company: string;
    period: string;
    summary: string;
    description: string[];
    tags: string[];
    extraTags?: string[];
};

type Project = {
    id: number;
    /** Year of completion */
    year: number;
    /** Month of completion */
    month: number;
    /** Where I worked when I built the project */
    company: string;
    /** Who the project was built for */
    client?: string;
    /** Title of the project */
    title: string;
    /** Short description of the project */
    description: string;
    /** Additional info about the project */
    info: string;
    /** Link to the project */
    href?: string;
    /** Tags for the project */
    tags: string[];
    /** Whether to showcase the project on the home page */
    showcase?: boolean;
    /** Highlight for visitors */
    favorite?: boolean;
    /** List of images to display for the project */
    images?: string[];
};

type Contact = {
    id: number;
    name: string;
    email: string;
    message: string;
    createdAt: Date;
    readAt?: Date;
};

type About = {
    id: number;
    title: string;
    description: string;
    name: string;
    tags: string[];
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
};

type Job = {
    id: number;
    createdAt: Date;
    company: string;
    title: string;
    pay?: string;
    description: string;
    href: string;
};
