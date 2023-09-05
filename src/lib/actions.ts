'use server';

import { experiences, projects } from '@/data';
import { prisma } from './prisma';

const config = {
    // cache for 24 hours
    cacheStrategy: {
        ttl: process.env.VERCEL_ENV === 'production' ? 60 * 60 * 24 : 10,
    },
};

export async function getAllExperiences(
    sortBy: 'id' | 'company',
): Promise<Experience[]> {
    const experiences = await prisma.experience.findMany({
        ...config,
        orderBy: {
            [sortBy]: 'asc',
        },
    });
    return experiences.map((experience) => ({
        ...experience,
        extraTags: experience.extraTags ? experience.extraTags.split(',') : [],
    }));
}

export async function getAllProjects(
    sortBy: 'id' | 'title',
): Promise<Project[]> {
    const projects = await prisma.project.findMany({
        ...config,
        orderBy: {
            [sortBy]: 'asc',
        },
    });
    return projects;
}

export async function createContact(
    name: string,
    email: string,
    message: string,
) {
    const contact = await prisma.contact.create({
        data: {
            name,
            email,
            message,
        },
    });
    return contact;
}

export async function getAllMessages() {
    const messages = await prisma.contact.findMany();
    return messages;
}

export async function updateExperience(e: Experience) {
    const experience = await prisma.experience.update({
        where: { id: e.id },
        data: {
            ...e,
            extraTags: e.extraTags ? e.extraTags.join(',') : undefined,
        },
    });
    return experience;
}

export async function createExperience(data: Experience) {
    const experience = await prisma.experience.create({
        data: {
            ...data,
            extraTags: data.extraTags ? data.extraTags.join(',') : undefined,
        },
    });
    return experience;
}

export async function createProject(data: Project) {
    const project = await prisma.project.create({
        data,
    });
    return project;
}

export async function updateProject(p: Project) {
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

export async function updateWithLocalData(p: Project[], e: Experience[]) {
    const newExperiences = experiences.filter(
        (e1) => !e.find((e2) => e2.company === e1.company),
    );
    for (const e of newExperiences) {
        await createExperience(e);
    }

    const newProjects = projects.filter(
        (p1) => !p.find((p2) => p2.title === p1.title),
    );
    for (const p of newProjects) {
        await createProject(p);
    }
}
