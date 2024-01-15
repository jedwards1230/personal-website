import TagList from "@/components/TagList";
import ProjectDialog from "@/components/dialogs/ProjectDialog";
import { getAllProjects } from "@/models/project.server";

export default async function Projects() {
	const projects = await getAllProjects();

	return (
		<div className="space-y-2 print:hidden">
			<div className="text-xl font-semibold">Projects</div>
			<div className="grid grid-cols-3 gap-4">
				{projects.map(project => (
					<ProjectDialog
						project={project}
						className="col-span-1 flex flex-col justify-between gap-2 rounded border border-border p-2 hover:bg-secondary"
						key={project.id}
					>
						<div className="space-y-1 text-left">
							<div className="">
								<div className="text-lg font-medium">
									{project.title}
								</div>
								<div className="text-sm font-medium">
									@{project.company}
								</div>
							</div>
							<p className="text-sm text-secondary-foreground">
								{project.date.getUTCMonth() + 1}/
								{project.date.getUTCFullYear()}
							</p>
							<p className="text-sm">{project.description}</p>
						</div>
						<div>
							<TagList size="sm" tags={project.tags} />
						</div>
					</ProjectDialog>
				))}
			</div>
		</div>
	);
}
