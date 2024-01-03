import Markdown from "@/components/Markdown";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function ProjectView({ data }: { data: Project }) {
	const date = new Date(data.date);
	const images = data.images
		?.map(i => (i.length > 0 ? i : null))
		.filter(i => i);

	return (
		<div className="flex w-full flex-col gap-4">
			<div className="w-1/2">
				<p className="text-2xl font-bold">{data.title}</p>
				<p className="text-lg text-secondary-foreground">
					{data.company}
				</p>
				<p className="text-secondary-foreground">{data.client}</p>
				<p>
					{date.getMonth() + 1}/{date.getFullYear()}
				</p>
			</div>
			{data.href && (
				<div className="flex flex-col gap-2">
					<Label>Link</Label>
					<p>{data.href}</p>
				</div>
			)}
			{images.length > 0 && (
				<div className="flex flex-col min-w-[50%] gap-2">
					<Label>Images</Label>
					<div className="flex flex-wrap gap-2">
						{images.map(image =>
							image ? (
								<Image
									width={256}
									height={144}
									key={image}
									className="w-64 border border-border"
									src={image}
									alt={image}
								/>
							) : null
						)}
					</div>
				</div>
			)}
			<div className="flex flex-col gap-2">
				<Label>Description</Label>
				<Markdown>{data.description}</Markdown>
			</div>
			<div className="flex flex-col gap-2">
				<Label>Info</Label>
				<Markdown>{data.info}</Markdown>
			</div>
			<div className="w-full flex flex-col gap-2">
				<div className="flex w-full items-center gap-2">
					<Label className="w-1/4">Showcase</Label>
					<p>{data.showcase ? "True" : "False"}</p>
				</div>
				<div className="flex w-full items-center gap-2">
					<Label className="w-1/4">Favorite</Label>
					<p>{data.favorite ? "True" : "False"}</p>
				</div>
				<div className="flex flex-col gap-2">
					<Label>Tags</Label>
					<p>
						{data.tags && data.tags.length > 0
							? data.tags.join(", ")
							: "None"}
					</p>
				</div>
			</div>
		</div>
	);
}
