import Markdown from "@/components/Markdown";
import { Label } from "@/components/ui/label";

export default function ProjectView({
	data,
	minimal = false,
}: {
	data: Project[];
	minimal?: boolean;
}) {
	return data.map((p) => {
		return (
			<div
				key={p.id}
				className="flex border border-border rounded-rounded p-4 flex-col gap-2"
			>
				<div className="flex pb-4 justify-between gap-2">
					<div className="w-1/2">
						<p className="text-2xl font-bold">{p.title}</p>
						<p className="text-lg text-secondary-foreground">
							{p.company}
						</p>
						<p className="text-secondary-foreground">{p.client}</p>
					</div>
					<p>
						{p.month}/{p.year}
					</p>
				</div>
				{p.href && (
					<div className="flex flex-col gap-2">
						<Label>Link</Label>
						<p>{p.href}</p>
					</div>
				)}
				<div className="flex">
					{p.images.length > 0 && (
						<div className="flex flex-col min-w-[50%] gap-2">
							<Label>Images</Label>
							<div className="flex flex-wrap gap-2">
								{p.images.map((image) => (
									<img
										key={image}
										className="w-64"
										src={image}
										alt={image}
									/>
								))}
							</div>
						</div>
					)}
					<div className="flex flex-col gap-2">
						<Label>Description</Label>
						<Markdown>{p.description}</Markdown>
					</div>
				</div>
				{!minimal && (
					<>
						<div className="flex flex-col gap-2">
							<Label>Info</Label>
							<Markdown>{p.info}</Markdown>
						</div>
						<div className="w-full flex flex-col gap-2">
							<div className="flex w-full items-center gap-2">
								<Label className="w-1/4">Showcase</Label>
								<p>{p.showcase ? "True" : "False"}</p>
							</div>
							<div className="flex w-full items-center gap-2">
								<Label className="w-1/4">Favorite</Label>
								<p>{p.favorite ? "True" : "False"}</p>
							</div>
							<div className="flex flex-col gap-2">
								<Label>Tags</Label>
								<p>
									{p.tags && p.tags.length > 0
										? p.tags.join(", ")
										: "None"}
								</p>
							</div>
						</div>
					</>
				)}
			</div>
		);
	});
}
