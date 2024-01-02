"use server";

import { invariant } from "@/lib/utils";
import { kv } from "@vercel/kv";
import { addIdToList, getAllIds } from "./helpers";
import { revalidatePath } from "next/cache";

const stringify = (e: Education): string =>
	JSON.stringify({
		...e,
		endDate: e.endDate ? e.endDate.toDateString() : null,
	});

export async function createEducation(data: Education): Promise<number> {
	const key = `education-${data.id}`;
	await kv.set(key, stringify(data));
	const id = await addIdToList("education-ids", data.id);
	revalidatePath("/");
	return id;
}

export async function getEducationById(id: number): Promise<Education> {
	const key = `education-${id}`;
	const value = await kv.get<Education>(key);
	invariant(value, "Education not found");
	return value;
}

export async function getAllEducations(
	sortBy?: keyof Education
): Promise<Education[]> {
	const ids = await getAllIds("education-ids");
	const Educations = [];
	for (const id of ids) {
		const Education = await getEducationById(id);
		if (Education) {
			Educations.push(Education);
		}
	}

	const cleanedEducations = Educations.map(e => ({
		...e,
		endDate: new Date(e.endDate),
	}));

	if (sortBy) {
		cleanedEducations.sort((a, b) => {
			if (a.endDate === null) return -1;
			if (b.endDate === null) return 1;
			return b.endDate.getTime() - a.endDate.getTime();
		});
	}

	return cleanedEducations;
}

export async function updateEducation(e: Education) {
	const key = `education-${e.id}`;
	await kv.set(key, stringify(e));
	revalidatePath("/");
}

export async function getNewEducationId(): Promise<number> {
	const ids = await getAllIds("education-ids");
	const maxId = Math.max(...ids);
	return isFinite(maxId) ? maxId + 1 : 1;
}
