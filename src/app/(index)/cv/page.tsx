import { Button } from "@/components/ui/button";
import { getAbout } from "@/models/about.server";
import Link from "next/link";
import Experiences from "./Experiences";
import Projects from "./Projects";

export default async function Page() {
	const about = await getAbout();

	const linkedInUsername = about.linkedin.replace(/\/$/, "").split("/").pop();
	const githubUsername = about.github.replace(/\/$/, "").split("/").pop();

	return (
		<div className="max-w-4xl px-4 space-y-6 mx-auto py-16">
			<Button className="!px-0" variant="link" asChild>
				<Link href="/">Home</Link>
			</Button>
			<div className="flex justify-between">
				<div>
					<div className="text-2xl font-bold">{about.name}</div>
					<div className="text-lg font-semibold pb-1">
						{about.title}
					</div>
					<div>{about.location}</div>
				</div>

				<div className="flex flex-col text-sm gap-1 pt-1">
					<a
						className="hover:underline"
						target="_blank"
						href={"mailto:" + about.email + "?subject=Hello!"}
					>
						{about.email}
					</a>
					<a
						className="hover:underline"
						target="_blank"
						href={about.linkedin}
					>
						{linkedInUsername}
					</a>
					<a
						className="hover:underline"
						target="_blank"
						href={about.github}
					>
						{githubUsername}
					</a>
				</div>
			</div>
			<Experiences />
			<Projects />
		</div>
	);
}
