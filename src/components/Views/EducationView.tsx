export default function EducationView({ data }: { data: Education }) {
	const endDate = data.endDate ? new Date(data.endDate) : null;

	return (
		<div className="rounded-rounded flex flex-col gap-2 border border-border p-4 transition-all">
			<div className="w-1/2 pb-4">
				<p className="text-xl font-bold">{data.school}</p>
				<p className="text-lg text-secondary-foreground">
					{data.degree}
				</p>
				<p>
					{endDate
						? endDate.getMonth() + 1 + "/" + endDate.getFullYear()
						: "Present"}
				</p>
			</div>
		</div>
	);
}
