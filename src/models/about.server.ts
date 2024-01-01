"use server";

import { invariant } from "@/lib/utils";
import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";

export async function getAbout(): Promise<About> {
	const value = await kv.get<About>("about");
	invariant(value, "About not found");
	return value;
}

export async function updateAbout(a: About) {
	await kv.set("about", JSON.stringify(a));
	revalidatePath("/");
}
