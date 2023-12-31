"use server";

import { createAdminSession } from "@/app/session.server";

export default async function loginAction(p: any, formData: FormData) {
	const password = String(formData.get("password"));

	try {
		return await createAdminSession(password, "/admin");
	} catch (error) {
		return { error: String(error) };
	}
}
