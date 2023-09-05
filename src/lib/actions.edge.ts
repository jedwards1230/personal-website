import { prisma } from './prisma.edge';

export async function getAllExperiences(): Promise<Experience[]> {
    const experiences = await prisma.experience.findMany();
    return experiences.map((experience) => ({
        ...experience,
        extraTags: experience.extraTags ? experience.extraTags.split(',') : [],
    }));
}

export async function getAllProjects(): Promise<Project[]> {
    const projects = await prisma.project.findMany();
    return projects;
}
