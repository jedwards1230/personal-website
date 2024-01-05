import Markdown from "@/components/Markdown";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function AboutView({ data }: { data: About }) {
	return (
		<div className="rounded-rounded flex flex-col gap-2 border border-border p-4">
			<div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
				<div className="sm:w-1/2">
					<p className="text-2xl font-bold">{data.name}</p>
					<p className="text-lg text-secondary-foreground">
						{data.title}
					</p>
				</div>
				<div className="sm:text-right">
					<p>{data.location}</p>
					<p>{data.email}</p>
					<p>{data.phone}</p>
				</div>
			</div>
			<div className="flex-col gap-2">
				<Label>About</Label>
				<Markdown>{data.description}</Markdown>
			</div>
			<div className="flex flex-col gap-2">
				<Label>LinkedIn</Label>
				<Button className="!h-min !w-max !p-0" variant="link" asChild>
					<a href={data.linkedin} target="_blank">
						{data.linkedin}
					</a>
				</Button>
			</div>
			<div className="flex flex-col gap-2">
				<Label htmlFor="github">GitHub</Label>
				<Button className="!h-min !w-max !p-0" variant="link" asChild>
					<a href={data.github} target="_blank">
						{data.github}
					</a>
				</Button>
			</div>
			<div className="flex flex-col gap-2">
				<Label>Tags</Label>
				<p>{data.tags.join(", ")}</p>
			</div>
		</div>
	);
}
