import { getAllProjects } from "@/models/project.server";

import SectionTitle from "./SectionTitle";
import ProjectDialog from "@/components/dialogs/ProjectDialog";
import Project from "./Project";

const ID = "projects";

export default async function ProjectsList() {
	const projects = await getAllProjects();

	return (
		<section
			id={ID}
			className="flex min-h-screen py-2 flex-col gap-4 md:gap-8 sm:py-16 md:justify-between"
		>
			<SectionTitle id={ID} />
			<div className="grid grid-cols-12 gap-4 md:gap-6">
				{projects.map((p, i) => (
					<ProjectDialog
						project={p}
						className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
						key={"projects-" + i}
					>
						<Project project={p} />
					</ProjectDialog>
				))}
			</div>
		</section>
	);
}
