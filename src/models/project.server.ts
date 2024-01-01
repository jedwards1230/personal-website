"use server";

import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";

import { invariant } from "@/lib/utils";
import { addIdToList, getAllIds } from "./helpers";

const stringify = (p: Project): string =>
	JSON.stringify({
		...p,
		date: p.date.toDateString(),
	});

export async function createProject(data: Project): Promise<number> {
	const key = `project-${data.id}`;
	await kv.set(key, stringify(data));
	const id = await addIdToList("project-ids", data.id);
	revalidatePath("/");
	return id;
}

export async function getProjectById(id: number): Promise<Project> {
	const key = `project-${id}`;
	const value = await kv.get<Project>(key);
	invariant(value, "Project not found");
	return value;
}

export async function getAllProjects(): Promise<Project[]> {
	const ids = await getAllIds("project-ids");
	const projects = [];
	for (const id of ids) {
		const project = await getProjectById(id);
		if (project) {
			projects.push(project);
		}
	}
	return projects.map(p => ({
		...p,
		date: new Date(p.date),
	}));
}

export async function updateProject(p: Project): Promise<Project> {
	await kv.set(`project-${p.id}`, stringify(p));
	revalidatePath("/");
	return p;
}
