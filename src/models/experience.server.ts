"use server";

import { invariant } from "@/lib/utils";
import { kv } from "@vercel/kv";
import { addIdToList, getAllIds } from "./helpers";
import { revalidatePath } from "next/cache";

const stringify = (e: Experience): string =>
	JSON.stringify({
		...e,
		startDate: e.startDate.toDateString(),
		endDate: e.endDate ? e.endDate.toDateString() : null,
	});

export async function createExperience(data: Experience): Promise<number> {
	const key = `experience-${data.id}`;
	await kv.set(key, stringify(data));
	const id = await addIdToList("experience-ids", data.id);
	revalidatePath("/", "layout");
	return id;
}

export async function getExperienceById(id: number): Promise<Experience> {
	const key = `experience-${id}`;
	const value = await kv.get<Experience>(key);
	invariant(value, "Experience not found");
	return value;
}

export async function getAllExperiences(
	sortBy?: keyof Experience
): Promise<Experience[]> {
	const ids = await getAllIds("experience-ids");
	const experiences = [];
	for (const id of ids) {
		const experience = await getExperienceById(id);
		if (experience) {
			experiences.push(experience);
		}
	}

	const cleanedExperiences = experiences.map(e => ({
		...e,
		startDate: new Date(e.startDate),
		endDate: e.endDate ? new Date(e.endDate) : null,
	}));

	if (sortBy) {
		cleanedExperiences.sort((a, b) => {
			switch (sortBy) {
				case "endDate":
					if (a.endDate === null && b.endDate === null) {
						return b.startDate.getTime() - a.startDate.getTime();
					}
					if (a.endDate === null) return -1;
					if (b.endDate === null) return 1;
					return b.endDate.getTime() - a.endDate.getTime();
				case "startDate":
					return a.startDate.getTime() - b.startDate.getTime();
				case "company":
					return a.company.localeCompare(b.company);
				default:
					return 0;
			}
		});
	}

	return cleanedExperiences;
}

export async function updateExperience(e: Experience) {
	const key = `experience-${e.id}`;
	await kv.set(key, stringify(e));
	revalidatePath("/", "layout");
}
