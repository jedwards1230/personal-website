"use server";

import { invariant } from "@/lib/utils";
import { kv } from "@vercel/kv";
import { addIdToList, getAllIds } from "./helpers";

const stringify = (e: Experience): string =>
	JSON.stringify({
		...e,
		startDate: e.startDate.toISOString().split("T")[0],
		endDate: e.endDate ? e.endDate.toISOString().split("T")[0] : null,
	});

export async function createExperience(data: Experience): Promise<number> {
	const key = `experience-${data.id}`;
	await kv.set(key, stringify(data));
	const id = await addIdToList("experience-ids", data.id);
	return id;
}

export async function getExperienceById(id: number): Promise<Experience> {
	const key = `experience-${id}`;
	const value = await kv.get<Experience>(key);
	invariant(value, "Experience not found");
	return {
		...value,
		startDate: new Date(value.startDate),
		endDate: value.endDate ? new Date(value.endDate) : null,
	};
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

	if (sortBy) {
		experiences.sort((a, b) => {
			switch (sortBy) {
				case "endDate":
					if (a.endDate === null && b.endDate === null) {
						return b.startDate.getTime() - a.startDate.getTime();
					}
					if (a.endDate === null) return -1;
					if (b.endDate === null) return 1;
					return b.endDate.getTime() - a.endDate.getTime();
				case "startDate":
					return b.startDate.getTime() - a.startDate.getTime();
				case "company":
					return a.company.localeCompare(b.company);
				default:
					return 0;
			}
		});
	}

	return experiences;
}

export async function updateExperience(e: Experience) {
	const key = `experience-${e.id}`;
	await kv.set(key, stringify(e));
}

export async function getNewExperienceId(): Promise<number> {
	const ids = await getAllIds("experience-ids");
	const maxId = Math.max(...ids);
	return isFinite(maxId) ? maxId + 1 : 1;
}
