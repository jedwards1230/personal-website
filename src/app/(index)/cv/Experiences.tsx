import { getAllExperiences } from "@/models/experience.server";

export default async function Experiences() {
	const experiences = await getAllExperiences("endDate");
	return (
		<div className="space-y-2">
			<div className="text-xl font-semibold">Experience</div>
			<div className="space-y-4">
				{experiences.map(experience => {
					const startDate = new Date(experience.startDate);
					const endDate = experience.endDate
						? new Date(experience.endDate)
						: null;

					return (
						<div key={experience.id}>
							<div className="flex pb-2 justify-between">
								<div className="flex gap-2 items-end">
									<div className="font-medium">
										{experience.company}
									</div>
									{"-"}
									<div>{experience.title}</div>
								</div>
								<div
									title={calculateTimeSpent(
										startDate,
										endDate
									)}
									className="flex gap-2 text-secondary-foreground"
								>
									<p>
										{startDate.getMonth() + 1}/
										{startDate.getFullYear()}
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
							<div className="text-sm px-2">
								{experience.description.map(d => (
									<div key={d}>{d}</div>
								))}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

function calculateTimeSpent(startDate: Date, endDate?: Date | null): string {
	if (!endDate) {
		endDate = new Date();
	}

	let years = endDate.getFullYear() - startDate.getFullYear();
	let months = endDate.getMonth() - startDate.getMonth() + 1;

	if (months <= 0) {
		years--;
		months += 12;
	} else if (months > 12) {
		years++;
		months = 0;
	}

	return `${years} years, ${months} months`;
}
