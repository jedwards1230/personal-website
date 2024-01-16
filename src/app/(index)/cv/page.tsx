import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getAbout } from "@/models/about.server";
import Experiences from "./Experiences";
import Projects from "./Projects";
import DownloadResume from "../DownloadResume";
import Educations from "./Education";
import IconLinks from "./IconLinks";
import Section from "./Section";

export const dynamic = "force-dynamic";

export default async function Page() {
	const about = await getAbout();

	return (
		<div className="mx-auto max-w-4xl space-y-4 px-4 py-4 md:space-y-8 md:py-8 print:space-y-2 print:px-0 print:py-0">
			<div className="flex w-full items-center justify-between print:hidden">
				<Button className="!px-0" variant="link" asChild>
					<Link href="/">Home</Link>
				</Button>
				<DownloadResume />
			</div>
			<div className="flex flex-col justify-between gap-2 md:flex-row print:flex-row print:gap-1">
				<div>
					<div className="text-2xl font-bold">{about.name}</div>
					<div className="pb-1 text-lg font-medium">
						{about.title}
					</div>
					<div>{about.location}</div>
				</div>
				<IconLinks about={about} />
			</div>
			<Section title="About">
				<p className="text-sm">{about.description}</p>
			</Section>
			<Experiences />
			<Educations />
			<Projects />
		</div>
	);
}
