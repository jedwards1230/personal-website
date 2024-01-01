"use server";

import { invariant } from "@/lib/utils";
import { kv } from "@vercel/kv";
import { addIdToList, getAllIds } from "./helpers";

export async function createProject(data: Project): Promise<number> {
	const key = `project-${data.id}`;
	await kv.set(key, JSON.stringify(data));
	const id = await addIdToList("project-ids", data.id);
	invariant(id, "Failed to add project ID to list");
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
	return projects;
}

export async function updateProject(p: Project): Promise<Project> {
	await kv.set(`project:${p.id}`, p);
	return p;
}
