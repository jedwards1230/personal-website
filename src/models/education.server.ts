"use server";

import { kv } from "@vercel/kv";

import { invariant } from "@/lib/utils";
import { addIdToList, getAllIds } from "./helpers";

const stringify = (e: Education): string =>
	JSON.stringify({
		...e,
		endDate: e.endDate ? e.endDate.toDateString() : null,
	});

export async function createEducation(data: Education): Promise<number> {
	const key = `education-${data.id}`;
	await kv.set(key, stringify(data));
	const id = await addIdToList("education-ids", data.id);
	return id;
}

export async function getEducationById(id: number): Promise<Education> {
	const key = `education-${id}`;
	const value = await kv.get<Education>(key);
	invariant(value, "Education not found");
	return { ...value, endDate: new Date(value.endDate) };
}

export async function getAllEducations(
	sortBy?: keyof Education
): Promise<Education[]> {
	const ids = await getAllIds("education-ids");
	const educations = [];
	for (const id of ids) {
		const Education = await getEducationById(id);
		if (Education) {
			educations.push(Education);
		}
	}

	if (sortBy) {
		educations.sort((a, b) => {
			if (a.endDate === null) return -1;
			if (b.endDate === null) return 1;
			return b.endDate.getTime() - a.endDate.getTime();
		});
	}

	return educations;
}

export async function updateEducation(e: Education) {
	const key = `education-${e.id}`;
	await kv.set(key, stringify(e));
}

export async function getNewEducationId(): Promise<number> {
	const ids = await getAllIds("education-ids");
	const maxId = Math.max(...ids);
	return isFinite(maxId) ? maxId + 1 : 1;
}
