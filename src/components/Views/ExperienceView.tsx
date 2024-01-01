import Markdown from "@/components/Markdown";
import { Label } from "@/components/ui/label";

export default function ExperienceView({ data }: { data: Experience }) {
	const startDate = new Date(data.startDate);
	const endDate = data.endDate ? new Date(data.endDate) : null;

	return (
		<div className="flex transition-all flex-col gap-2">
			<div className="w-1/2 pb-4">
				<p className="text-2xl font-bold">{data.company}</p>
				<p className="text-lg text-secondary-foreground">
					{data.title}
				</p>
				<div className="flex gap-2">
					<p>
						{startDate.getMonth() + 1}/{startDate.getFullYear()}
					</p>
					-
					<p>
						{endDate
							? endDate.getMonth() +
								1 +
								"/" +
								endDate.getFullYear()
							: "Present"}
					</p>
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<Label>Summary</Label>
				<p>{data.summary}</p>
			</div>
			<div className="flex flex-col gap-2">
				<Label>Description</Label>
				<Markdown>
					{data.description ? data.description.join("\n") : "None"}
				</Markdown>
			</div>
			<div className="flex flex-col gap-2">
				<Label>Tags</Label>
				<p>
					{data.tags && data.tags.length > 0
						? data.tags.join(", ")
						: "None"}
				</p>
			</div>
			{data.extraTags && data.extraTags.length > 0 && (
				<div className="flex flex-col gap-2">
					<Label>Extra Tags</Label>
					<p>{data.extraTags.join(", ")}</p>
				</div>
			)}
		</div>
	);
}
