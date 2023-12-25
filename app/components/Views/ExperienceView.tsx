import Markdown from "@/components/Markdown";
import { Label } from "@/components/ui/label";

export default function ExperienceView({
	data,
	minimal = false,
}: {
	data: Experience[];
	minimal?: boolean;
}) {
	return data.map((e) => {
		return (
			<div
				key={e.id}
				className="flex transition-all border border-border rounded-rounded p-4 flex-col gap-2"
			>
				<div className="w-full pb-4 flex justify-between">
					<div className="w-1/2">
						<p className="text-2xl font-bold">{e.company}</p>
						<p className="text-lg text-secondary-foreground">
							{e.title}
						</p>
					</div>
					<p>{e.period}</p>
				</div>

				<div className="flex flex-col gap-2">
					<Label>Summary</Label>
					<p>{e.summary}</p>
				</div>
				{!minimal && (
					<>
						<div className="flex flex-col gap-2">
							<Label>Description</Label>
							<Markdown>
								{e.description
									? e.description.join("\n")
									: "None"}
							</Markdown>
						</div>
						<div className="flex flex-col gap-2">
							<Label>Tags</Label>
							<p>
								{e.tags && e.tags.length > 0
									? e.tags.join(", ")
									: "None"}
							</p>
						</div>
						{e.extraTags && e.extraTags.length > 0 && (
							<div className="flex flex-col gap-2">
								<Label>Extra Tags</Label>
								<p>{e.extraTags.join(", ")}</p>
							</div>
						)}
					</>
				)}
			</div>
		);
	});
}
