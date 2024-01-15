import { getAllEducations } from "@/models/education.server";

export default async function Educations() {
	const educations = await getAllEducations("endDate");
	return (
		<div className="space-y-4">
			<div className="text-xl font-semibold">Education</div>
			<div className="space-y-4">
				{educations.map(education => {
					const endDate = education.endDate
						? new Date(education.endDate)
						: null;

					return (
						<div key={education.id}>
							<div className="flex flex-col gap-1 pb-2 sm:flex-row sm:justify-between sm:gap-2">
								<div className="flex flex-col gap-1">
									<div className="font-medium md:text-lg">
										{education.school}
									</div>
									<div>{education.degree}</div>
								</div>
								<p className="text-secondary-foreground">
									{endDate
										? endDate.getUTCMonth() +
											1 +
											"/" +
											endDate.getUTCFullYear()
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
