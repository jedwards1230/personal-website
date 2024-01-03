import { getPageViews } from "@/lib/utils";

export default async function PageViews() {
	const pageViews = await getPageViews();

	return (
		<div
			aria-label="Page Views"
			className="mb-8 mt-auto select-none text-center text-xs text-foreground/70"
		>
			{pageViews} {pageViews === 1 ? "visit" : "visits"} this week
		</div>
	);
}
