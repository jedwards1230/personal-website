export async function GET(request: Request) {
	const url = new URL(request.url);
	return fetch(url.origin + "/Justin-Edwards-Resume.pdf");
}
