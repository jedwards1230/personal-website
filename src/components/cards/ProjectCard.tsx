import clsx from "clsx";

import TagList from "../TagList";
import Markdown from "../Markdown";
import ImagesDialog from "../dialogs/ImagesDialog";

export default function ProjectCard({ project }: { project: Project }) {
	const images = project.images?.length
		? project.images.filter(i => i.length > 0)
		: [];

	return (
		<div className="flex w-full max-w-7xl flex-col pb-4 sm:px-4">
			{/* Title - Client - Year */}
			<div className="mb-4 flex w-full flex-col gap-2 sm:flex-row md:gap-4">
				<div className="max-w-[60%]">
					{images.length > 0 && (
						<ImagesDialog
							project={project}
							src={images[0]}
							alt={project.title}
						/>
					)}
				</div>

				<div
					className={clsx(
						"flex w-full flex-col gap-2 py-2",
						images.length > 0 && "sm:ml-4"
					)}
				>
					{/* Details */}
					<div
						className={clsx(
							!images ||
								(images.length === 0 && "flex justify-between")
						)}
					>
						<div>
							<p className="flex items-center gap-2 text-xl font-medium">
								{project.title}
							</p>
							<p className="text-lg text-foreground/85">
								{project.company}
							</p>
						</div>
						<div className="text-foreground/70">
							{project.date.getUTCMonth() + 1}/
							{project.date.getUTCFullYear()}
						</div>
					</div>
					{/* Project Link */}
					{project.href && (
						<a
							href={project.href}
							target="_blank"
							rel="noopener noreferrer"
							className="text-neutral-600 hover:underline dark:text-neutral-300"
						>
							View Project
						</a>
					)}
					{/* Tags */}
					<TagList tags={project.tags} />
				</div>
			</div>
			{project.info && (
				<div className="flex flex-col gap-1">
					<Markdown>{project.info}</Markdown>
				</div>
			)}
		</div>
	);
}
