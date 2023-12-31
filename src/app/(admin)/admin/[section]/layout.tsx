import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	getAllExperiences,
	createExperience,
} from "@/models/experience.server";
import { createProject, getAllProjects } from "@/models/project.server";
import NavItem from "../NavItem";

export const dynamic = "force-dynamic";

const SECTIONS = {
	projects: {
		getData: () => getAllProjects("title"),
		create: () => createProject,
		path: "/admin/projects",
		title: "Projects",
		listBy: "title",
	},
	experience: {
		getData: () => getAllExperiences("company"),
		create: createExperience,
		path: "/admin/experience",
		title: "Experience",
		listBy: "company",
	},
};

export default async function Layout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { section: keyof typeof SECTIONS };
}) {
	const { path, listBy, title, getData } = SECTIONS[params.section];
	const data = await getData();
	return (
		<>
			<div className="flex col-span-3 border-r border-border flex-col">
				<div className="flex p-2 pl-4 border-b border-border justify-between items-center">
					<h2 className="text-lg font-bold">{title}</h2>
					<form method="post">
						<Button variant="outline" size="icon">
							<Plus />
						</Button>
					</form>
				</div>
				{data.map((d: any) => (
					<div key={d.id}>
						<NavItem eq={true} to={`${path}/${d.id}`}>
							{d[listBy]}
						</NavItem>
					</div>
				))}
			</div>
			{children}
		</>
	);
}