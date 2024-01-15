import TagList from "@/components/TagList";
import ProjectDialog from "@/components/dialogs/ProjectDialog";
import { getAllProjects } from "@/models/project.server";

export default async function Projects() {
	const projects = await getAllProjects();

	return (
		<div className="space-y-4">
			<div className="text-xl font-semibold">Projects</div>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 print:flex print:flex-col print:gap-1">
				{projects.map(project => (
					<ProjectDialog
						project={project}
						className="col-span-1 flex flex-col justify-between gap-2 rounded border border-border p-2 hover:bg-secondary print:gap-1 print:border-transparent print:p-0"
						key={project.id}
					>
						<div className="space-y-1 text-left">
							<div className="print:flex print:justify-between">
								<div className="print:flex print:items-center print:gap-2">
									<div className="text-lg font-medium print:text-base">
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
							</div>
							<p className="text-sm print:pl-2">
								{project.description}
							</p>
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
