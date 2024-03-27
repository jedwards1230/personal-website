"use client";

import { usePlausible } from "next-plausible";
import Image from "next/image";

import ImageCard from "@/components/cards/ImageCard";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

export default function ImagesDialog({
	project,
	src,
	alt,
}: {
	project: Project;
	src: string;
	alt: string;
}) {
	const plausible = usePlausible();

	const openImageModal = () =>
		plausible("View Project Image", {
			props: {
				project: project.title,
			},
		});

	return (
		<Dialog>
			<DialogTrigger onClick={openImageModal} asChild>
				<Image
					width={800}
					height={400}
					src={src}
					alt={alt}
					className="cursor-pointer select-none rounded-lg border border-foreground shadow-sm transition-all hover:sm:scale-[101%]"
				/>
			</DialogTrigger>
			<DialogContent size="full">
				<ImageCard project={project} />
			</DialogContent>
		</Dialog>
	);
}
