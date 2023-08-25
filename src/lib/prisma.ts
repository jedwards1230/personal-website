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
