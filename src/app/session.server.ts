"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { invariant } from "@/lib/utils";

invariant(
	process.env.ADMIN_PASSWORD,
	"Missing ADMIN_PASSWORD environment variable"
);
invariant(
	process.env.SESSION_SECRET,
	"Missing SESSION_SECRET environment variable"
);

export async function createAdminSession(password: string, redirectTo: string) {
	if (password !== process.env.ADMIN_PASSWORD) {
		throw new Error("Invalid password");
	}

	cookies().set({
		name: "admin",
		value: "true",
		httpOnly: true,
		sameSite: "lax",
		maxAge: 60 * 60 * 24 * 30, // 30 days
	});
}

export async function isAuthenticated() {
	const cookieStore = cookies();
	const isAdmin = cookieStore.get("admin");
	return isAdmin?.value === "true";
}

export async function requireAdminSession() {
	if (!isAuthenticated()) {
		throw redirect("/login");
	}
}

export async function logoutAdminSession() {
	cookies().delete("admin");
	redirect("/");
}
