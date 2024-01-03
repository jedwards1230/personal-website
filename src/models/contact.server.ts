"use server";

import { invariant } from "@/lib/utils";
import { kv } from "@vercel/kv";
import { addIdToList, getAllIds, removeIdFromList } from "./helpers";

export async function createContact(contact: Contact): Promise<number> {
	const key = `contact-${contact.id}`;
	await kv.set(key, JSON.stringify(contact));
	const id = await addIdToList("contact-ids", contact.id);
	return id;
}

export async function readContact(id: number): Promise<Contact> {
	const key = `contact-${id}`;
	const contact = await kv.get<Contact>(key);
	invariant(contact, "Contact not found: " + id);
	return {
		...contact,
		createdAt: new Date(contact.createdAt),
		readAt: contact.readAt ? new Date(contact.readAt) : null,
	};
}

export async function getAllMessages(): Promise<Contact[]> {
	const ids = await getAllIds("contact-ids");
	const contacts = [];
	for (const id of ids) {
		try {
			const contact = await readContact(id);
			if (contact) {
				contacts.push(contact);
			}
		} catch (err) {
			console.log(err);
		}
	}
	return contacts.sort((a, b) => {
		if (a.readAt === null && b.readAt === null) {
			return b.createdAt.getTime() - a.createdAt.getTime();
		}
		if (a.readAt === null) return -1;
		if (b.readAt === null) return 1;
		return b.readAt.getTime() - a.readAt.getTime();
	});
}

export async function getUnreadMessageCount(): Promise<number> {
	const messages = await getAllMessages();
	return messages.reduce(
		(count, message) => (message.readAt === null ? count + 1 : count),
		0
	);
}

export async function deleteContact(id: number): Promise<void> {
	const key = `contact-${id}`;
	await removeIdFromList("contact-ids", id);
	await kv.del(key);
}
