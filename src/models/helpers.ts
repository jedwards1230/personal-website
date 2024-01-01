"use server";

import { invariant } from "@/lib/utils";
import { kv } from "@vercel/kv";

export async function getAllIds(key: string): Promise<number[]> {
	const idsString = await kv.get<number[]>(key);
	return idsString ? idsString : [];
}

export async function addIdToList(key: string, id: number) {
	const ids = await getAllIds(key);
	if (!ids.includes(id)) {
		ids.push(id);
		const res = await kv.set(key, JSON.stringify(ids));
		invariant(res, `Failed to add ID to list: ${key}`);
		return id;
	}
	return null;
}

export async function removeIdFromList(key: string, id: number) {
	const ids = await getAllIds(key);
	const index = ids.indexOf(id);
	if (index > -1) {
		ids.splice(index, 1);
		await kv.set(key, JSON.stringify(ids));
	}
}
