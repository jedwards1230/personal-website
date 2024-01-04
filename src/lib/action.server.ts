"use server";

import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export async function revalidateAction() {
	revalidatePath("/", "layout");
}

export async function uploadImageAction() {
	// TODO
}

export async function deleteBlob(url: string) {
	del(url);
}
