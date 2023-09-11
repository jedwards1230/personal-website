'use server';

import { prisma } from './prisma';
import { getServerSession } from 'next-auth';
import { redirect, notFound } from 'next/navigation';
import { authOptions } from './auth';

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

export async function updateAbout(a: About) {
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
        return projects;
    } catch (error) {
        console.error(error);
        throw error;
    }
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

export async function deleteContact(id: number) {
    const contact = await prisma.contact.delete({
        where: { id },
    });
    return contact;
}

export async function getAllMessages() {
    const messages = await prisma.contact.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
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

export async function getSession(redirectToSignIn: boolean = true) {
    const session = await getServerSession(authOptions);

    if (!session) {
        if (redirectToSignIn) redirect('/api/auth/signin');
        return null;
    }

    if (session.user.email !== process.env.ADMIN_EMAIL) {
        notFound();
    }

    return session;
}
