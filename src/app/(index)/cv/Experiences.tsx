import { getAllExperiences } from "@/models/experience.server";
import Section from "./Section";

export default async function Experiences() {
	const experiences = await getAllExperiences("startDate");
	return (
		<Section title="Experience" className="print:space-y-1">
			<div className="space-y-4 print:space-y-2">
				{experiences.map(experience => {
					const startDate = new Date(experience.startDate);
					const endDate = experience.endDate
						? new Date(experience.endDate)
						: null;

					return (
						<div key={experience.id}>
							<div className="flex flex-col gap-1 pb-1 sm:flex-row sm:justify-between sm:gap-2 md:pb-2">
								<div className="flex flex-col sm:flex-row sm:items-end sm:gap-2">
									<div className="font-medium">
										{experience.company}
									</div>
									<span className="invisible hidden sm:inline-block">
										{"-"}
									</span>
									<div>{experience.title}</div>
								</div>
								<div
									title={calculateTimeSpent(
										startDate,
										endDate
									)}
									className="flex gap-2 text-sm text-secondary-foreground"
								>
									<p>
										{startDate.getUTCMonth() + 1}/
										{startDate.getUTCFullYear()}
									</p>
									-
									<p>
										{endDate
											? endDate.getUTCMonth() +
												1 +
												"/" +
												endDate.getUTCFullYear()
											: "Present"}
									</p>
								</div>
							</div>
							<div className="px-2 text-sm">
								{experience.description.map(d => (
									<div key={d}>{d}</div>
								))}
							</div>
						</div>
					);
				})}
			</div>
		</Section>
	);
}

function calculateTimeSpent(startDate: Date, endDate?: Date | null): string {
	if (!endDate) {
		endDate = new Date();
	}

	let years = endDate.getUTCFullYear() - startDate.getUTCFullYear();
	let months = endDate.getUTCMonth() - startDate.getUTCMonth() + 1;

	if (months <= 0) {
		years--;
		months += 12;
	} else if (months > 12) {
		years++;
		months = 0;
	}

	return `${years} years, ${months} months`;
}
