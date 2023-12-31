"use server";

import { updateAbout } from "@/models/about.server";
import { updateExperience } from "@/models/experience.server";
import { redirect } from "next/navigation";

export async function handleAboutFormSubmit(p: any, formData: FormData) {
	const id = Number(formData.get("id"));
	if (isNaN(id)) return { error: "Invalid id." };

	try {
		await updateAbout({
			id,
			name: String(formData.get("name")),
			title: String(formData.get("title")),
			location: String(formData.get("location")),
			email: String(formData.get("email")),
			phone: String(formData.get("phone")),
			linkedin: String(formData.get("linkedin")),
			github: String(formData.get("github")),
			tags: String(formData.get("tags")).split(","),
			description: String(formData.get("description")),
		});
	} catch (error: any) {
		return { error: "Failed to send message." };
	}

	redirect("/admin/about");
}
