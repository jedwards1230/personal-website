import ProjectCard from "../cards/ProjectCard";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

export default function ProjectDialog({
	project,
	className,
	children,
}: {
	project: Project;
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<Dialog>
			<DialogTrigger className={className}>{children}</DialogTrigger>
			<DialogContent size="lg">
				<ProjectCard
					project={{
						...project,
						date: new Date(project.date),
					}}
				/>
			</DialogContent>
		</Dialog>
	);
}
