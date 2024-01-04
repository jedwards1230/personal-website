// FILEPATH: /Users/justin/Projects/personal-website/tests/models/project.spec.ts

import { getAllIds } from "@/models/helpers";
import { getAllProjects, getProjectById } from "@/models/project.server";
import { createProject, deleteProject } from "@/models/project.server"; // Assuming these functions exist
import { test, expect } from "@playwright/test";

test("get all projects", async () => {
	// Arrange: Create some projects
	const project1: Project = {
		id: 100001,
		title: "Test Project 1",
		company: "Test Company",
		date: new Date(2022, 1, 1),
		client: "Test Client",
		description: "Test Description",
		info: "Test Info",
		href: "Test Href",
		tags: ["Test Tag"],
		images: ["Test Image"],
	};
	const project2: Project = {
		id: 100002,
		title: "Test Project 2",
		company: "Test Company",
		date: new Date(2021, 1, 1),
		client: "Test Client",
		description: "Test Description",
		info: "Test Info",
		href: "Test Href",
		tags: ["Test Tag"],
		images: ["Test Image"],
	};
	await createProject(project1);
	await createProject(project2);

	// Act: Get all projects
	const projects = await getAllProjects();

	// Assert: Check if the projects were retrieved correctly
	expect(projects.length).toBeGreaterThanOrEqual(2);
	const storedProject1 = await getProjectById(project1.id);
	const storedProject2 = await getProjectById(project2.id);

	expect(storedProject1).toEqual(project1);
	expect(storedProject2).toEqual(project2);

	// Clean up: Delete the projects
	await deleteProject(project1.id);
	await deleteProject(project2.id);

	const projectIds = await getAllIds("project-ids");
	expect(projectIds).not.toContain(project1.id);
	expect(projectIds).not.toContain(project2.id);

	// Assert: Check if the contact was deleted successfully by trying to read it again
	await expect(getProjectById(project1.id)).rejects.toThrow(
		"Project not found"
	);
	await expect(getProjectById(project2.id)).rejects.toThrow(
		"Project not found"
	);
});
