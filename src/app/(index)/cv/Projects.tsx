import TagList from "@/components/TagList";
import { getAllProjects } from "@/models/project.server";

export default async function Projects() {
	const projects = await getAllProjects();

	return (
		<div className="space-y-2">
			<div className="text-xl font-semibold">Projects</div>
			<div className="space-y-4">
				{projects.map(project => (
					<div className="space-y-1" key={project.id}>
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
						<div className="text-sm px-2">
							{project.description}
						</div>
						<div>
							<TagList tags={project.tags} />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
