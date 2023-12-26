export async function getPageViews(): Promise<number> {
	const url = new URL("https://plausible.io/api/v1/stats/aggregate");
	url.searchParams.set("site_id", "jedwards.cc");
	url.searchParams.set("period", "7d");
	//url.searchParams.set('filters', 'visit:city!=4151316');

	const res: {
		results: {
			visitors: {
				value: number;
			};
		};
	} = await fetch(url, {
		headers: {
			Authorization: "Bearer " + process.env.PLAUSIBLE_API_KEY,
		},
		// next: { revalidate: 10 },
	}).then(res => res.json());

	return res.results.visitors.value || 0;
}
