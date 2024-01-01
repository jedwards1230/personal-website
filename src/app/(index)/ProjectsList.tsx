import { getAllProjects } from "@/models/project.server";

import SectionTitle from "./SectionTitle";
import Projects from "./Projects";

const ID = "projects";

export default async function ProjectsList() {
	const projects = await getAllProjects();

	return (
		<section
			id={ID}
			className="flex flex-col gap-4 sm:py-16 md:justify-between"
		>
			<SectionTitle id={ID} />
			<Projects projects={projects} />
		</section>
	);
}
