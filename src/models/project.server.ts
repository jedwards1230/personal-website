"use server";

import { prisma } from "@/lib/prisma";
import { invariant } from "@/lib/utils";

export async function createProject(data: Project): Promise<Project> {
	const project = await prisma.project.create({
		data,
	});
	return project;
}

export async function getProjectById(id: number): Promise<Project> {
	const project = await prisma.project.findUnique({
		where: { id },
	});
	invariant(project, "Project not found");
	return {
		...project,
		images:
			project.images.length > 0
				? project.images.filter(img => img !== "")
				: [],
	};
}

export async function getAllProjects(
	sortBy: "id" | "title"
): Promise<Project[]> {
	try {
		const projects = await prisma.project.findMany({
			orderBy: {
				[sortBy]: "asc",
			},
		});
		return projects.map(project => ({
			...project,
			images:
				project.images.length > 0
					? project.images.filter(img => img !== "")
					: [],
		}));
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function updateProject(p: Project): Promise<Project> {
	const project = await prisma.project.update({
		where: { id: p.id },
		data: p,
	});
	return project;
}
