import Markdown from "@/components/Markdown";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import TagList from "../TagList";

export default function ProjectView({ data }: { data: Project | null }) {
	const date = data?.date ? new Date(data?.date) : new Date();
	const dateStr = `${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;

	const images = data?.images
		? data.images?.map(i => (i.length > 0 ? i : null)).filter(i => i)
		: [];

	return (
		<div className="w-full space-y-4">
			<div className="w-1/2">
				<p className="text-2xl font-bold">{data?.title}</p>
				<p className="text-lg text-secondary-foreground">
					{data?.company}
				</p>
				<p className="text-secondary-foreground">{data?.client}</p>
				<p>{dateStr}</p>
			</div>
			{data?.tags && data?.tags.length > 0 && (
				<div className="space-y-2">
					<Label>Tags</Label>
					<TagList tags={data.tags} />
				</div>
			)}
			{data?.href && (
				<div className="space-y-2">
					<Label>Link</Label>
					<a
						className="block text-sm hover:underline"
						href={data.href}
						target="_blank"
						rel="noreferrer"
					>
						{data.href}
					</a>
				</div>
			)}
			{images.length > 0 && (
				<div className="flex min-w-[50%] flex-col gap-2">
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
			{data?.description && (
				<div className="space-y-2">
					<Label>Description</Label>
					<Markdown>{data.description}</Markdown>
				</div>
			)}
			{data?.info && (
				<div className="space-y-2">
					<Label>Info</Label>
					<Markdown>{data.info}</Markdown>
				</div>
			)}
		</div>
	);
}
