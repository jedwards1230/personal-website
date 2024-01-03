import {
	createContact,
	deleteContact,
	readContact,
} from "@/models/contact.server";
import { test, expect } from "@playwright/test";

test("create, read, and delete a contact", async ({ page }) => {
	const contact: Contact = {
		id: 100001,
		name: "Test Contact",
		email: "test@example.com",
		message: "Hello, this is a test message.",
		createdAt: new Date(),
		readAt: null,
	};

	// Act: Create a contact
	console.log("creating contact");
	const createdContactId = await createContact(contact);

	// Assert: Check if the contact was created successfully
	expect(createdContactId).toBe(contact.id);

	// Act: Read the contact
	const readContactData = await readContact(createdContactId);

	// Assert: Check if the read contact data matches the created contact data
	expect(readContactData.id).toEqual(contact.id);
	expect(readContactData.name).toEqual(contact.name);
	expect(readContactData.email).toEqual(contact.email);
	expect(readContactData.message).toEqual(contact.message);
	expect(readContactData.readAt).toEqual(contact.readAt);
	expect(readContactData.createdAt).toBeInstanceOf(Date);

	// Act: Delete the contact
	await deleteContact(createdContactId);

	// Assert: Check if the contact was deleted successfully by trying to read it again
	await expect(readContact(createdContactId)).rejects.toThrow(
		"Contact not found"
	);
});
