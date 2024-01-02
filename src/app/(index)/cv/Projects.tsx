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
						className="space-y-1 border border-transparent hover:border-border rounded-rounded rounded p-2"
						key={project.id}
					>
						<div className="flex items-center justify-between">
							<div className="flex gap-2 items-center">
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
