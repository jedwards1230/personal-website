import { updateAbout } from "@/models/about.server";
import { createContact } from "@/models/contact.server";
import { createExperience } from "@/models/experience.server";
import { createProject } from "@/models/project.server";
import { readFileSync } from "fs";
import { join } from "path";

async function loadDataFromFile() {
	const filePath = join(__dirname, "./data.json");
	const data = JSON.parse(readFileSync(filePath, "utf8"));

	// Upload projects
	for (const project of data.projects) {
		await createProject(project);
	}

	// Upload experiences
	for (const experience of data.experience) {
		await createExperience({
			...experience,
			startDate: new Date(),
			endDate: experience.endDate ? new Date() : null,
		});
	}

	// Upload contacts
	for (const contact of data.messages) {
		await createContact(contact);
	}

	// Set About data
	await updateAbout(data.about);
}

loadDataFromFile();
