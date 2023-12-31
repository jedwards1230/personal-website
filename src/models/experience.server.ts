"use server";

import { prisma } from "@/lib/prisma";
import { invariant } from "@/lib/utils";

export async function createExperience(): Promise<number> {
	const experience = await prisma.experience.create({
		data: {
			title: "New Title",
			company: "New Company",
			period: "",
			summary: "",
			description: [""],
			tags: [],
			extraTags: "",
		},
	});
	return experience.id;
}

export async function getExperienceById(id: number): Promise<Experience> {
	const experience = await prisma.experience.findUnique({
		where: { id },
	});
	invariant(experience, "Experience not found");
	return {
		...experience,
		extraTags: experience.extraTags ? experience.extraTags.split(",") : [],
	};
}

export async function getAllExperiences(
	sortBy: "id" | "company"
): Promise<Experience[]> {
	try {
		const experiences = await prisma.experience.findMany({
			orderBy: {
				[sortBy]: "asc",
			},
		});
		return experiences.map(experience => ({
			...experience,
			extraTags: experience.extraTags
				? experience.extraTags.split(",")
				: [],
		}));
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function updateExperience(e: Experience): Promise<Experience> {
	const experience = await prisma.experience.update({
		where: { id: e.id },
		data: {
			...e,
			extraTags: e.extraTags ? e.extraTags.join(",") : undefined,
		},
	});
	return {
		...experience,
		extraTags: experience.extraTags ? experience.extraTags.split(",") : [],
	};
}