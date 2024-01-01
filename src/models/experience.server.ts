"use server";

import { invariant } from "@/lib/utils";
import { kv } from "@vercel/kv";
import { addIdToList, getAllIds } from "./helpers";

export async function createExperience(data: Experience): Promise<number> {
	const key = `experience-${data.id}`;
	await kv.set(key, JSON.stringify(data));
	const id = await addIdToList("experience-ids", data.id);
	invariant(id, "Failed to add experience ID to list");
	return id;
}

export async function getExperienceById(id: number): Promise<Experience> {
	const key = `experience-${id}`;
	const value = await kv.get<Experience>(key);
	invariant(value, "Experience not found");
	return value;
}

export async function getAllExperiences(): Promise<Experience[]> {
	const ids = await getAllIds("experience-ids");
	const experiences = [];
	for (const id of ids) {
		const experience = await getExperienceById(id);
		if (experience) {
			experiences.push(experience);
		}
	}
	return experiences;
}

export async function updateExperience(e: Experience) {
	const key = `experience-${e.id}`;
	await kv.set(key, JSON.stringify(e));
}
