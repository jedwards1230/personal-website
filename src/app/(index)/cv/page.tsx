import { Button } from "@/components/ui/button";
import { getAbout } from "@/models/about.server";
import Link from "next/link";
import Experiences from "./Experiences";
import Projects from "./Projects";
import DownloadResume from "../DownloadResume";
import Educations from "./Education";

export const dynamic = "force-dynamic";

export default async function Page() {
	const about = await getAbout();

	const linkedInUsername = about.linkedin.replace(/\/$/, "").split("/").pop();
	const githubUsername = about.github.replace(/\/$/, "").split("/").pop();

	return (
		<div className="mx-auto max-w-4xl space-y-4 px-4 py-4 print:space-y-2 print:px-0 print:py-0 md:space-y-8 md:py-8">
			<div className="flex w-full items-center justify-between print:hidden">
				<Button className="!px-0" variant="link" asChild>
					<Link href="/">Home</Link>
				</Button>
				<DownloadResume />
			</div>
			<div className="flex flex-col justify-between gap-2 print:flex-row print:gap-1 md:flex-row">
				<div>
					<div className="text-2xl font-bold">{about.name}</div>
					<div className="pb-1 text-lg font-semibold">
						{about.title}
					</div>
					<div>{about.location}</div>
				</div>
				<div className="flex flex-col justify-center gap-1 pt-1 text-sm md:text-right">
					<div>
						Email:{" "}
						<a
							className="hover:underline"
							target="_blank"
							href={"mailto:" + about.email + "?subject=Hello!"}
						>
							{about.email}
						</a>
					</div>
					<div>
						LinkedIn:{" "}
						<a
							className="hover:underline"
							target="_blank"
							href={about.linkedin}
						>
							@{linkedInUsername}
						</a>
					</div>
					<div>
						GitHub:{" "}
						<a
							className="hover:underline"
							target="_blank"
							href={about.github}
						>
							@{githubUsername}
						</a>
					</div>
				</div>
			</div>
			<p className="text-sm">{about.description}</p>
			<Experiences />
			<Educations />
			<Projects />
		</div>
	);
}
