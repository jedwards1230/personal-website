"use server";

import { getAbout, updateAbout } from "@/models/about.server";
import { createContact, getAllMessages } from "@/models/contact.server";
import {
	createExperience,
	getAllExperiences,
} from "@/models/experience.server";
import { createProject, getAllProjects } from "@/models/project.server";
import { createEducation, getAllEducations } from "./education.server";

export async function uploadData({
	about,
	educations,
	projects,
	experiences,
	messages,
}: {
	about: About;
	educations: Education[];
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

	for (const education of educations) {
		await createEducation({
			...education,
			endDate: new Date(education.endDate),
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

export async function getAllData() {
	const about = await getAbout();
	const educations = await getAllEducations();
	const projects = await getAllProjects();
	const experiences = await getAllExperiences();
	const messages = await getAllMessages();

	return {
		about,
		educations,
		projects,
		experiences,
		messages,
	};
}
