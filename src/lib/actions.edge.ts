import { prisma } from './prisma.edge';

const config = {
    // cache for 24 hours
    cacheStrategy: { ttl: 60 * 60 * 24 },
};

export async function getAllExperiences(): Promise<Experience[]> {
    const experiences = await prisma.experience.findMany(config);
    return experiences.map((experience) => ({
        ...experience,
        extraTags: experience.extraTags ? experience.extraTags.split(',') : [],
    }));
}

export async function getAllProjects(): Promise<Project[]> {
    const projects = await prisma.project.findMany(config);
    return projects;
}
