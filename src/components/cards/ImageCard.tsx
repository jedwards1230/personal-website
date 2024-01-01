"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePlausible } from "next-plausible";
import { useEffect, useState } from "react";

export default function ImageCard({ project }: { project: Project }) {
	const plausible = usePlausible();
	const [idx, setIdx] = useState(0);

	const next = () => setIdx(idx < project.images.length - 1 ? idx + 1 : 0);
	const prev = () => setIdx(idx > 0 ? idx - 1 : project.images.length - 1);

	useEffect(() => {
		plausible("Image", {
			props: {
				project: project.title,
				image: project.images[idx],
			},
		});
	}, [idx, plausible, project.images, project.title]);

	return (
		<div className="relative flex h-auto select-none items-center justify-center overflow-x-hidden">
			<div
				className="flex transition-transform duration-300 ease-in-out"
				style={{ transform: `translateX(-${idx * 100}%)` }}
			>
				{project.images.map((image, i) => (
					<div key={i} className="w-full flex-shrink-0">
						<img
							src={image}
							alt={project.title}
							width={1920}
							height={1080}
							className="mx-auto h-full w-full"
						/>
					</div>
				))}
			</div>
			{project.images.length > 1 && (
				<>
					<div className="absolute inset-y-0 left-0 flex items-center">
						<button
							onClick={prev}
							className="flex h-12 w-12 items-center justify-center rounded-r border border-border bg-background/20 transition-all hover:bg-background/80"
						>
							<ChevronLeft />
						</button>
					</div>
					<div className="absolute inset-y-0 right-0 flex items-center">
						<button
							onClick={next}
							className="flex h-12 w-12 items-center justify-center rounded-l border border-border transition-all hover:bg-background/80 dark:bg-background/20"
						>
							<ChevronRight />
						</button>
					</div>
				</>
			)}
		</div>
	);
}
