'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

export async function createExperience(data: Experience) {
    const experience = await prisma.experience.create({
        data,
    });
    return experience;
}

export async function getPageViews(): Promise<number> {
    const url = new URL('https://plausible.io/api/v1/stats/aggregate');
    url.searchParams.set('site_id', 'jedwards.cc');
    url.searchParams.set('period', '7d');
    //url.searchParams.set('filters', 'visit:city!=4151316');

    const res = await fetch(url, {
        headers: {
            Authorization: 'Bearer ' + process.env.PLAUSIBLE_API_KEY,
        },
    }).then((res) => res.json());

    return res.results.visitors.value || 0;
}
