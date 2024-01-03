import {
	deleteContact,
	getAllMessages,
	readContact,
} from "@/models/contact.server";
import { test, expect } from "@playwright/test";

test("can submit contact form", async ({ page }) => {
	const formData = {
		name: "Test Name",
		email: "test@example.com",
		message: "Test message",
	};

	// Go to the page with the contact form
	await page.goto("http://localhost:3000/");

	// Fill out the form fields
	await page.fill('input[name="name"]', formData.name);
	await page.fill('input[name="email"]', formData.email);
	await page.fill('textarea[name="message"]', formData.message);

	// Submit the form
	await page.click('button[type="submit"]');

	// Check for success message
	const successMessage = await page.waitForSelector(".text-green-500");
	expect(await successMessage.innerText()).toBe("Message sent successfully!");

	// delete from db
	const messages = await getAllMessages();
	const sentMessage = messages.find(m => m.email === formData.email);
	expect(sentMessage).toBeDefined();
	if (!sentMessage) throw new Error("Message not found");
	await deleteContact(sentMessage.id);

	// verify message was deleted
	await expect(readContact(sentMessage.id)).rejects.toThrow(
		"Contact not found"
	);
});
