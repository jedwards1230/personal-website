import Markdown from "@/components/Markdown";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function AboutView({ data }: { data: About }) {
	return (
		<div className="flex border border-border rounded-rounded p-4 flex-col gap-2">
			<div className="flex justify-between gap-4">
				<div className="w-1/2">
					<p className="text-2xl font-bold">{data.name}</p>
					<p className="text-lg text-secondary-foreground">
						{data.title}
					</p>
				</div>
				<div className="text-right">
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
				<Button className="!w-max !p-0 !h-min" variant="link" asChild>
					<a href={data.linkedin} target="_blank">
						{data.linkedin}
					</a>
				</Button>
			</div>
			<div className="flex flex-col gap-2">
				<Label htmlFor="github">GitHub</Label>
				<Button className="!w-max !p-0 !h-min" variant="link" asChild>
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
