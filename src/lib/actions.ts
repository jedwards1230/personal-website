'use server';

import { prisma } from './prisma';

export async function getAllExperiences(
    sortBy: 'id' | 'company',
): Promise<Experience[]> {
    try {
        const experiences = await prisma.experience.findMany({
            orderBy: {
                [sortBy]: 'asc',
            },
        });
        return experiences.map((experience) => ({
            ...experience,
            extraTags: experience.extraTags
                ? experience.extraTags.split(',')
                : [],
        }));
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getAbout(): Promise<About> {
    try {
        const about = await prisma.about.findFirst();
        return (
            about || {
                id: 0,
                name: '',
                title: '',
                description: '',
                tags: [],
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                github: '',
            }
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function updateAbout(a: About): Promise<About> {
    const about = await prisma.about.upsert({
        where: { id: a.id },
        update: a,
        create: a,
    });
    return about;
}

export async function getAllProjects(
    sortBy: 'id' | 'title',
): Promise<Project[]> {
    try {
        const projects = await prisma.project.findMany({
            orderBy: {
                [sortBy]: 'asc',
            },
        });
        return projects.map((project) => ({
            ...project,
            images:
                project.images.length > 0
                    ? project.images.filter((img) => img !== '')
                    : [],
        }));
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getAllJobs(): Promise<Job[]> {
    try {
        const jobs = await prisma.job.findMany({
            orderBy: {
                createdAt: 'asc',
            },
        });
        return jobs;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function createContact(
    name: string,
    email: string,
    message: string,
): Promise<Contact> {
    const contact = await prisma.contact.create({
        data: {
            name,
            email,
            message,
        },
    });
    return contact;
}

export async function readContact(id: number): Promise<Contact> {
    const contact = await prisma.contact.update({
        where: { id },
        data: {
            readAt: new Date(),
        },
    });
    return contact;
}

export async function deleteContact(id: number) {
    const contact = await prisma.contact.delete({
        where: { id },
    });
    return contact;
}

export async function getAllMessages(): Promise<Contact[]> {
    const messages = await prisma.contact.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
    return messages;
}

export async function updateExperience(e: Experience): Promise<Experience> {
    const experience = await prisma.experience.update({
        where: { id: e.id },
        data: {
            ...e,
            extraTags: e.extraTags ? e.extraTags.join(',') : undefined,
        },
    });
    return {
        ...experience,
        extraTags: experience.extraTags ? experience.extraTags.split(',') : [],
    };
}

export async function createExperience(data: Experience): Promise<Experience> {
    const experience = await prisma.experience.create({
        data: {
            ...data,
            extraTags: data.extraTags ? data.extraTags.join(',') : undefined,
        },
    });
    return {
        ...experience,
        extraTags: experience.extraTags ? experience.extraTags.split(',') : [],
    };
}

export async function createJob(data: Job): Promise<Job> {
    const job = await prisma.job.create({
        data,
    });
    return job;
}

export async function deleteJob(id: number): Promise<Job> {
    const job = await prisma.job.delete({
        where: { id },
    });
    return job;
}

export async function updateJob(j: Job): Promise<Job> {
    const job = await prisma.job.update({
        where: { id: j.id },
        data: j,
    });
    return job;
}

export async function createProject(data: Project): Promise<Project> {
    const project = await prisma.project.create({
        data,
    });
    return project;
}

export async function updateProject(p: Project): Promise<Project> {
    const project = await prisma.project.update({
        where: { id: p.id },
        data: p,
    });
    return project;
}

export async function getPageViews(): Promise<number> {
    const url = new URL('https://plausible.io/api/v1/stats/aggregate');
    url.searchParams.set('site_id', 'jedwards.cc');
    url.searchParams.set('period', '7d');
    //url.searchParams.set('filters', 'visit:city!=4151316');

    const res: {
        results: {
            visitors: {
                value: number;
            };
        };
    } = await fetch(url, {
        headers: {
            Authorization: 'Bearer ' + process.env.PLAUSIBLE_API_KEY,
        },
        next: { revalidate: 10 },
    }).then((res) => res.json());

    return res.results.visitors.value || 0;
}
