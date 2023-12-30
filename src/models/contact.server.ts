"use server";

import { prisma } from "@/lib/prisma";

export async function createContact(
	name: string,
	email: string,
	message: string
): Promise<Contact> {
	const contact = await prisma.contact.create({
		data: {
			name: name || "Anonymous",
			email: email || "Anonymous",
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

export async function getAllMessages(): Promise<Contact[]> {
	const messages = await prisma.contact.findMany({
		orderBy: {
			createdAt: "desc",
		},
	});
	return messages;
}

export async function getUnreadMessageCount() {
	const count = await prisma.contact.count({
		where: {
			readAt: null,
		},
	});
	return count;
}

export async function deleteContact(id: number) {
	const contact = await prisma.contact.delete({
		where: { id },
	});
	return contact;
}
