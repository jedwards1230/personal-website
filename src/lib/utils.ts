import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const isProduction = process.env.NODE_ENV === "production";

export function invariant(
	condition: any,
	message?: string | (() => string)
): asserts condition {
	const prefix = "Invariant failed";

	if (condition) {
		return;
	}
	if (isProduction) {
		throw new Error(prefix);
	}
	var provided = typeof message === "function" ? message() : message;
	var value = provided ? "".concat(prefix, ": ").concat(provided) : prefix;
	throw new Error(value);
}

export async function getPageViews(): Promise<number | null> {
	const url = new URL("https://plausible.io/api/v1/stats/aggregate");
	url.searchParams.set("site_id", "jedwards.cc");
	url.searchParams.set("period", "7d");
	//url.searchParams.set('filters', 'visit:city!=4151316');

	try {
		const response = await fetch(url, {
			headers: {
				Authorization: "Bearer " + process.env.PLAUSIBLE_API_KEY,
			},
		});

		const res = (await response.json()) as {
			results: {
				visitors: {
					value: number;
				};
			};
		};

		return res.results.visitors.value || 0;
	} catch (e: any) {
		console.error(`Error fetching page views: ${e}`);
		return null;
	}
}
