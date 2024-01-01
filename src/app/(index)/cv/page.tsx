import { Button } from "@/components/ui/button";
import { getAbout } from "@/models/about.server";
import { getAllExperiences } from "@/models/experience.server";
import { getAllProjects } from "@/models/project.server";
import Link from "next/link";

export default async function Page() {
	const [about, projects, experience] = await Promise.all([
		await getAbout(),
		await getAllProjects(),
		await getAllExperiences(),
	]);

	const linkedInUsername = about.linkedin.replace(/\/$/, "").split("/").pop();
	const githubUsername = about.github.replace(/\/$/, "").split("/").pop();

	return (
		<div className="max-w-4xl space-y-6 mx-auto py-16">
			<Button className="!px-0" variant="link" asChild>
				<Link href="/">Home</Link>
			</Button>
			<div className="flex justify-between">
				<div>
					<div className="text-2xl font-bold">{about.name}</div>
					<div className="text-lg font-semibold pb-1">
						{about.title}
					</div>
					<div>{about.location}</div>
				</div>

				<div className="flex flex-col gap-1 pt-1">
					<a
						className="hover:underline"
						target="_blank"
						href={"mailto:" + about.email + "?subject=Hello!"}
					>
						{about.email}
					</a>
					<a
						className="hover:underline"
						target="_blank"
						href={about.linkedin}
					>
						{linkedInUsername}
					</a>
					<a
						className="hover:underline"
						target="_blank"
						href={about.github}
					>
						{githubUsername}
					</a>
				</div>
			</div>
			<div className="space-y-1">
				<div className="text-xl font-semibold">Experience</div>
				<div className="space-y-2">
					{experience.map(experience => (
						<div key={experience.id}>
							<div className="flex pb-2 justify-between">
								<div className="flex gap-2 items-end">
									<div className="text-lg font-medium">
										{experience.company}
									</div>
									{"-"}
									<div>{experience.title}</div>
								</div>
								<div className="text-secondary-foreground">
									{experience.period}
								</div>
							</div>
							<div className="text-sm px-2">
								{experience.description.map(d => (
									<div key={d}>{d}</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
			{/* <div>
				<div className="text-lg font-semibold">Projects</div>
				<div>
					{projects.map(project => (
						<div key={project.id}>
							<div>{project.title}</div>
							<div>{project.description}</div>
						</div>
					))}
				</div>
			</div> */}
		</div>
	);
}
