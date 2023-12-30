"use server";

import { prisma } from "@/lib/prisma";

export async function getAbout(): Promise<About> {
	try {
		const about = await prisma.about.findFirst();
		return (
			about || {
				id: 0,
				name: "",
				title: "",
				description: "",
				tags: [],
				email: "",
				phone: "",
				location: "",
				linkedin: "",
				github: "",
			}
		);
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function updateAbout(a: About): Promise<About> {
	const about = await prisma.about.upsert({
		where: { id: a.id },
		update: a,
		create: a,
	});
	return about;
}
