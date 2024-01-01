"use server";

import { updateAbout } from "@/models/about.server";
import { createContact } from "@/models/contact.server";
import { createExperience } from "@/models/experience.server";
import { createProject } from "@/models/project.server";

export async function uploadData({
	about,
	projects,
	experiences,
	messages,
}: {
	about: About;
	projects: Project[];
	experiences: Experience[];
	messages: Contact[];
}) {
	// Upload projects
	for (const project of projects) {
		await createProject({
			...project,
			date: new Date(project.date),
		});
	}

	// Upload experiences
	for (const experience of experiences) {
		await createExperience({
			...experience,
			startDate: new Date(experience.startDate),
			endDate: experience.endDate ? new Date(experience.endDate) : null,
		});
	}

	// Upload contacts
	for (const contact of messages) {
		await createContact(contact);
	}

	// Set About data
	await updateAbout(about);
}
