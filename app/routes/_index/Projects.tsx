import { useMemo } from "react";

import TagList from "@/components/TagList";
import ProjectDialog from "@/components/dialogs/ProjectDialog";

import SectionTitle from "./SectionTitle";

const ID = "projects";

export default function Projects({ projects }: { projects: Project[] }) {
	const sortedProjects = useMemo(
		() =>
			projects.sort((a, b) => {
				// sort by year, most recent first
				if (a.year > b.year) return -1;
				if (a.year < b.year) return 1;
				// sort by month, most recent first
				if (a.month > b.month) return -1;
				if (a.month < b.month) return 1;
				// sort by favorite
				if (a.favorite && !b.favorite) return -1;
				if (!a.favorite && b.favorite) return 1;
				// sort by company
				if (a.company > b.company) return 1;
				if (a.company < b.company) return -1;
				// sort by title
				if (a.title > b.title) return 1;
				if (a.title < b.title) return -1;
				return 0;
			}),
		[projects]
	);

	return (
		<section
			id={ID}
			className="flex flex-col gap-4 sm:py-16 md:justify-between"
		>
			<SectionTitle id={ID} />
			<div className="grid grid-cols-12 gap-4">
				{sortedProjects.map((p, i) => (
					<ProjectDialog
						project={p}
						className="col-span-6 md:col-span-4 lg:col-span-3"
						key={"projects-" + i}
					>
						<div
							/* onClick={() =>
								plausible("View Project", {
									props: {
										project: p.title,
										showCase: true,
									},
								})
							} */
							className="flex h-full w-full cursor-pointer flex-col gap-2 rounded p-2 text-left text-neutral-500 transition-all hover:scale-105 hover:bg-neutral-200/50 dark:text-neutral-400 hover:dark:bg-neutral-800"
						>
							{/* Preview */}
							{p.images[0] ? (
								<img
									src={p.images[0]}
									alt={"Preview " + p.title + ".png"}
									className="h-36 w-full select-none rounded border border-border bg-neutral-100 shadow-sm sm:h-40"
								/>
							) : (
								<div className="flex h-36 w-full select-none items-center justify-center rounded border border-border bg-background text-foreground shadow-sm sm:h-40">
									{p.title}
								</div>
							)}
							{/* Title */}
							<div className="flex flex-col gap-1">
								<div className="flex flex-col justify-between font-medium text-foreground md:flex-row md:items-center">
									{p.title}
									{p.company !== "Personal" && (
										<div className="text-sm text-primary">
											@{p.company}
										</div>
									)}
								</div>
								{/* Description */}
								<div>{p.description}</div>

								<TagList tags={p.tags} />
							</div>
						</div>
					</ProjectDialog>
				))}
			</div>
		</section>
	);
}
