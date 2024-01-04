import TagList from "@/components/TagList";
import ProjectDialog from "@/components/dialogs/ProjectDialog";
import { getAllProjects } from "@/models/project.server";

export default async function Projects() {
	const projects = await getAllProjects();

	return (
		<div className="space-y-2 print:hidden">
			<div className="text-xl font-semibold">Projects</div>
			<div className="flex flex-col gap-4">
				{projects.map(project => (
					<ProjectDialog
						project={project}
						className="rounded-rounded space-y-1 rounded border border-transparent p-2 hover:border-border"
						key={project.id}
					>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<div className="font-medium">
									{project.title}
								</div>
								{"-"}
								<div className="text-sm">{project.company}</div>
							</div>
							<p className="text-sm text-secondary-foreground">
								{project.date.getMonth() + 1}/
								{project.date.getFullYear()}
							</p>
						</div>
						<div>
							<TagList tags={project.tags} />
						</div>
					</ProjectDialog>
				))}
			</div>
		</div>
	);
}
