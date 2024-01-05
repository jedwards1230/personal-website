"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { invariant } from "@/lib/utils";

invariant(
	process.env.ADMIN_PASSWORD,
	"Missing ADMIN_PASSWORD environment variable"
);

const ADMIN_SESSION_COOKIE_NAME = "admin";
const ADMIN_SESSION_COOKIE_VALUE = process.env.ADMIN_PASSWORD;

export async function createAdminSession(password: string, redirectTo: string) {
	if (password !== process.env.ADMIN_PASSWORD) {
		throw new Error("Invalid password");
	}

	cookies().set({
		name: ADMIN_SESSION_COOKIE_NAME,
		value: ADMIN_SESSION_COOKIE_VALUE,
		httpOnly: true,
		sameSite: "lax",
		secure: true,
		maxAge: 60 * 60 * 24 * 30, // 30 days
	});
}

export async function isAuthenticated() {
	const cookieStore = cookies();
	const isAdmin = cookieStore.get(ADMIN_SESSION_COOKIE_NAME);
	return isAdmin?.value === ADMIN_SESSION_COOKIE_VALUE;
}

export async function requireAdminSession() {
	if (!isAuthenticated()) {
		throw redirect("/login");
	}
}

export async function logoutAdminSession() {
	cookies().delete(ADMIN_SESSION_COOKIE_NAME);
	redirect("/");
}
