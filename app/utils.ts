import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
