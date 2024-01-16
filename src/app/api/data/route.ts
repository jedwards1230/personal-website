import { getAbout } from "@/models/about.server";
import { getAllExperiences } from "@/models/experience.server";
import { getAllProjects } from "@/models/project.server";

const returnError = (message: string) =>
	new Response(message, {
		status: 401,
		headers: {
			"WWW-Authenticate": 'Basic realm="Secure Data"',
		},
	});

export async function GET(req: Request) {
	const authHeader = req.headers.get("authorization");
	if (!authHeader) {
		return returnError("Authorization Required");
	}

	try {
		const { password } = decodeBasicAuth(authHeader);
		if (password !== process.env.ADMIN_PASSWORD) {
			return returnError("Unauthorized");
		}
	} catch (e) {
		return returnError("Unauthorized");
	}

	const [about, experiences, projects] = await Promise.all([
		getAbout(),
		getAllExperiences(),
		getAllProjects(),
	]);

	return new Response(
		JSON.stringify({
			about: {
				name: about.name,
				title: about.title,
				email: about.email,
				location: about.location,
				tags: about.tags,
				linkedin: about.linkedin,
				github: about.github,
			},
			experiences: experiences.map((e: Experience) => ({
				title: e.title,
				company: e.company,
				startDate: e.startDate,
				endDate: e.endDate,
				summary: e.summary,
				description: e.description,
				tags: e.tags,
			})),
			projects: projects.map((p: Project) => ({
				title: p.title,
				date: p.date,
				company: p.company,
				client: p.client,
				info: p.info,
				description: p.description,
				tags: p.tags,
			})),
		}),
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
}

function decodeBasicAuth(auth: string) {
	const decoded = atob(auth.split(" ").pop() || "");
	const parts = decoded.split(":");

	if (parts.length !== 2) {
		throw new Error(
			'Invalid Authorization header format. Expected format is "Basic username:password"'
		);
	}

	const [username, password] = parts;
	return { username, password };
}
