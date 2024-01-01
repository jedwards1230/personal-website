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
	invariant(contact, "Contact not found");
	return contact;
}

export async function getAllMessages(): Promise<Contact[]> {
	const ids = await getAllIds("contact-ids");
	const contacts = [];
	for (const id of ids) {
		const contact = await readContact(id);
		if (contact) {
			contacts.push(contact);
		}
	}
	return contacts;
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
	await kv.del(key);
	await removeIdFromList("contact-ids", id);
}
