import { Label } from "@/components/ui/label";

export default function JobView({ data }: { data?: Job }) {
	return (
		<div className="grid gap-2 sm:gap-4">
			<div>
				<Label>Company</Label>
				<p>{data?.company}</p>
			</div>
			<div>
				<Label>Title</Label>
				<p>{data?.title}</p>
			</div>
			<div>
				<Label>Pay</Label>
				<p>{data?.pay}</p>
			</div>
			<div className="flex flex-col gap-1">
				<Label>Link</Label>
				{data && (
					<a
						className="hover:underline"
						href={data?.href}
						target="_blank"
					>
						{data?.href}
					</a>
				)}
			</div>
			<div>
				<Label>Description</Label>
				<p>{data?.description}</p>
			</div>
		</div>
	);
}
