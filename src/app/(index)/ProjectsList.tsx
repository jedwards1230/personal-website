import { getAllProjects } from "@/models/project.server";

import SectionTitle from "./SectionTitle";
import Projects from "./Projects";

const ID = "projects";

export default async function ProjectsList() {
	const projects = await getAllProjects();

	return (
		<section
			id={ID}
			className="flex min-h-screen py-2 flex-col gap-4 md:gap-8 sm:py-16 md:justify-between"
		>
			<SectionTitle id={ID} />
			<Projects projects={projects} />
		</section>
	);
}
