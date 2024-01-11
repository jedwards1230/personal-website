import { getAllExperiences } from "@/models/experience.server";
import { getAllProjects } from "@/models/project.server";

export async function GET(req: Request) {
	const authHeader = req.headers.get("Authorization");
	if (!authHeader) {
		return new Response("Authorization Required", {
			status: 401,
			headers: {
				"WWW-Authenticate": 'Basic realm="Secure Data"',
			},
		});
	}

	const { password } = decodeBasicAuth(authHeader);
	if (password !== process.env.ADMIN_PASSWORD) {
		return new Response("Unauthorized", {
			status: 401,
			headers: {
				"WWW-Authenticate": 'Basic realm="Secure Data"',
			},
		});
	}

	const [experiences, projects] = await Promise.all([
		getAllExperiences(),
		getAllProjects(),
	]);

	return new Response(
		JSON.stringify({
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
	const [username, password] = atob(auth.split(" ")[1]).split(":");
	return { username, password };
}
