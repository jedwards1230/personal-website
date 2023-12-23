import { prisma } from "@/lib/prisma";

export async function createProject(data: Project): Promise<Project> {
	const project = await prisma.project.create({
		data,
	});
	return project;
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
		return projects.map((project) => ({
			...project,
			images:
				project.images.length > 0
					? project.images.filter((img) => img !== "")
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
