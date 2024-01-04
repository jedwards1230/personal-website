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
	about?: About;
	educations?: Education[];
	projects?: Project[];
	experiences?: Experience[];
	messages?: Contact[];
}) {
	// Upload projects
	if (projects) {
		for (const project of projects) {
			await createProject({
				...project,
				date: new Date(project.date),
			});
		}
	}

	if (educations) {
		for (const education of educations) {
			await createEducation({
				...education,
				endDate: new Date(education.endDate),
			});
		}
	}

	// Upload experiences
	if (experiences) {
		for (const experience of experiences) {
			await createExperience({
				...experience,
				startDate: new Date(experience.startDate),
				endDate: experience.endDate
					? new Date(experience.endDate)
					: null,
			});
		}
	}

	// Upload contacts
	if (messages) {
		for (const contact of messages) {
			await createContact(contact);
		}
	}

	// Set About data
	if (about) await updateAbout(about);
}

export async function getAllData() {
	const [about, educations, projects, experiences, messages] =
		await Promise.all([
			getAbout(),
			getAllEducations(),
			getAllProjects(),
			getAllExperiences(),
			getAllMessages(),
		]);

	return {
		about,
		educations,
		projects,
		experiences,
		messages,
	};
}
