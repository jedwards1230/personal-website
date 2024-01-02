import { Button } from "@/components/ui/button";
import { getAbout } from "@/models/about.server";
import Link from "next/link";
import Experiences from "./Experiences";
import Projects from "./Projects";
import DownloadResume from "../DownloadResume";
import Educations from "./Education";

export default async function Page() {
	const about = await getAbout();

	const linkedInUsername = about.linkedin.replace(/\/$/, "").split("/").pop();
	const githubUsername = about.github.replace(/\/$/, "").split("/").pop();

	return (
		<div className="max-w-4xl px-4 space-y-4 md:space-y-8 print:space-y-2 mx-auto print:py-0 print:px-0 py-4 md:py-16">
			<div className="w-full print:hidden items-center flex justify-between">
				<Button className="!px-0" variant="link" asChild>
					<Link href="/">Home</Link>
				</Button>
				<DownloadResume />
			</div>
			<div className="flex flex-col print:gap-1 gap-2 print:flex-row md:flex-row justify-between">
				<div>
					<div className="text-2xl font-bold">{about.name}</div>
					<div className="text-lg font-semibold pb-1">
						{about.title}
					</div>
					<div>{about.location}</div>
				</div>
				<div className="flex flex-col md:text-right justify-center text-sm gap-1 pt-1">
					<a
						className="hover:underline"
						target="_blank"
						href={"mailto:" + about.email + "?subject=Hello!"}
					>
						Email: {about.email}
					</a>
					<a
						className="hover:underline"
						target="_blank"
						href={about.linkedin}
					>
						LinkedIn: {linkedInUsername}
					</a>
					<a
						className="hover:underline"
						target="_blank"
						href={about.github}
					>
						GitHub: {githubUsername}
					</a>
				</div>
			</div>
			<p className="text-sm">{about.description}</p>
			<Experiences />
			<Educations />
			<Projects />
		</div>
	);
}
