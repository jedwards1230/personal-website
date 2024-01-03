"use server";

import { invariant } from "@/lib/utils";
import { kv } from "@vercel/kv";

export async function getAllIds(key: string): Promise<number[]> {
	const idsString = await kv.get<string[]>(key);
	return idsString ? idsString.map(id => Number(id)) : [];
}

export async function addIdToList(key: string, id: number) {
	const ids = await getAllIds(key);
	if (!ids.includes(id)) {
		ids.push(id);
		const res = await kv.set(key, ids);
		invariant(res, `Failed to add ID to list: ${key}`);
	}
	return id;
}

export async function removeIdFromList(key: string, id: number) {
	const ids = await getAllIds(key);
	const filteredIds = ids.filter(existingId => existingId !== id);
	await kv.set(key, filteredIds);
}
