import { getAllEducations } from "@/models/education.server";

export default async function Educations() {
	const educations = await getAllEducations("endDate");
	return (
		<div className="space-y-2">
			<div className="text-xl font-semibold">Education</div>
			<div className="space-y-4">
				{educations.map(education => {
					const endDate = education.endDate
						? new Date(education.endDate)
						: null;

					return (
						<div key={education.id}>
							<div className="flex gap-1 sm:gap-2 flex-col sm:flex-row pb-2 sm:justify-between">
								<div className="flex flex-col gap-1">
									<div className="font-medium md:text-lg">
										{education.school}
									</div>
									<div>{education.degree}</div>
								</div>
								<p className="text-secondary-foreground">
									{endDate
										? endDate.getMonth() +
											1 +
											"/" +
											endDate.getFullYear()
										: "Present"}
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
