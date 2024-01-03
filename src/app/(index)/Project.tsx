"use client";

import { usePlausible } from "next-plausible";
import Image from "next/image";

import TagList from "@/components/TagList";

export default function Project({ project }: { project: Project }) {
	const plausible = usePlausible();

	return (
		<div
			onClick={() =>
				plausible("View Project", {
					props: {
						project: project.title,
						showCase: true,
					},
				})
			}
			className="flex h-full w-full cursor-pointer flex-col gap-2 rounded p-2 text-left text-neutral-500 transition-all hover:scale-105 hover:bg-neutral-200/50 dark:text-neutral-400 hover:dark:bg-neutral-800"
		>
			{/* Preview */}
			{project.images[0] ? (
				<Image
					width={800}
					height={400}
					src={project.images[0]}
					alt={"Preview " + project.title + ".png"}
					className="h-auto aspect-video w-full select-none rounded border border-border bg-neutral-100 shadow-sm sm:h-40"
				/>
			) : (
				<div className="flex h-auto aspect-video w-full select-none items-center justify-center rounded border border-border bg-background text-foreground shadow-sm sm:h-40">
					{project.title}
				</div>
			)}
			{/* Title */}
			<div className="flex flex-col gap-1">
				<div className="space-y-1 items-center font-medium text-foreground">
					{project.title}
					{project.company !== "Personal" && (
						<div className="text-sm text-primary">
							@{project.company}
						</div>
					)}
				</div>
				{/* Description */}
				<div>{project.description}</div>

				<TagList tags={project.tags} />
			</div>
		</div>
	);
}
