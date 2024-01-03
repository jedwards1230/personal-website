type Section = "intro" | "projects" | "contact";

type Experience = {
	id: number;
	title: string;
	company: string;
	startDate: Date;
	endDate: Date | null;
	summary: string;
	description: string[];
	tags: string[];
	extraTags?: string[];
};

type Project = {
	id: number;
	date: Date;
	/** Where I worked when I built the project */
	company: string;
	/** Who the project was built for */
	client: string | null;
	/** Title of the project */
	title: string;
	/** Short description of the project */
	description: string;
	/** Additional info about the project */
	info: string;
	/** Link to the project */
	href: string | null;
	/** Tags for the project */
	tags: string[];
	/** List of images to display for the project */
	images: string[];
};

type Contact = {
	id: number;
	name: string;
	email: string;
	message: string;
	createdAt: Date;
	readAt: Date | null;
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

type Education = {
	id: number;
	school: string;
	degree: string;
	endDate: Date;
};

type Job = {
	id: number;
	createdAt: Date;
	company: string;
	title: string;
	pay: string | null;
	description: string;
	href: string;
};

type FormResponse = {
	success?: string;
	error?: string;
};
