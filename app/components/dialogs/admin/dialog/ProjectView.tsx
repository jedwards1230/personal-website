import Markdown from "@/components/Markdown";
import { Label } from "@/components/ui/label";

export default function ExperienceView({ data }: { data?: Project }) {
	return (
		<div className="grid gap-2 sm:gap-4">
			<div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-4">
				<div className="col-span-3 grid gap-2 sm:gap-4">
					<div>
						<Label>Company</Label>
						<p>{data?.company}</p>
					</div>
					<div>
						<Label>Client</Label>
						<p>{data?.client ? data.client : "None"}</p>
					</div>
				</div>
				<div className="grid gap-2 sm:gap-4">
					<div>
						<Label>Date</Label>
						<p>
							{data?.month} / {data?.year}
						</p>
					</div>
					<div className="grid grid-cols-6 gap-8">
						<div className="col-span-3">
							<Label>Showcase</Label>
							<p>{data?.showcase === true ? "True" : "False"}</p>
						</div>
						<div>
							<Label>Favorite</Label>
							<p>{data?.favorite === true ? "True" : "False"}</p>
						</div>
					</div>
				</div>
			</div>
			<div>
				<Label>Link</Label>
				<div>
					{data?.href ? (
						<a
							href={data.href}
							target="_blank"
							className="hover:underline"
						>
							{data.href}
						</a>
					) : (
						"None"
					)}
				</div>
			</div>
			<div>
				<Label>Images</Label>
				<div className="flex flex-wrap gap-2">
					{data?.images && data.images.length > 0
						? data?.images.map((src, i) => (
								<div
									key={data?.title + " image " + i}
									className="relative aspect-video w-1/4"
								>
									<img
										src={src}
										alt={data?.title + " image " + i}
									/>
								</div>
						  ))
						: "None"}
				</div>
			</div>
			<div>
				<Label>Description</Label>
				<p>{data?.description}</p>
			</div>
			<div>
				<Label>Info</Label>
				<Markdown>{data?.info || "Default Info"}</Markdown>
			</div>
			<div>
				<Label>Tags</Label>
				<p>{data?.tags.join(", ")}</p>
			</div>
		</div>
	);
}
