import { prisma } from "@/lib/prisma";

export async function createJob(data: Job): Promise<Job> {
	const job = await prisma.job.create({
		data,
	});
	return job;
}

export async function getAllJobs(): Promise<Job[]> {
	try {
		const jobs = await prisma.job.findMany({
			orderBy: {
				createdAt: "asc",
			},
		});
		return jobs;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function updateJob(j: Job): Promise<Job> {
	const job = await prisma.job.update({
		where: { id: j.id },
		data: j,
	});
	return job;
}

export async function deleteJob(id: number): Promise<Job> {
	const job = await prisma.job.delete({
		where: { id },
	});
	return job;
}
