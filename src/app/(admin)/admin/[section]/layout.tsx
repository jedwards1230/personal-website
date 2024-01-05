import {
	getAllExperiences,
	createExperience,
} from "@/models/experience.server";
import { createProject, getAllProjects } from "@/models/project.server";
import NavItem from "../NavItem";
import EditButton from "@/components/buttons/EditButton";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export const runtime = "edge";

const SECTIONS = {
	projects: {
		getData: () => getAllProjects(),
		create: () => createProject,
		path: "/admin/projects",
		title: "Projects",
		listBy: "title",
	},
	experience: {
		getData: () => getAllExperiences(),
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
			<div className="col-span-12 flex flex-col gap-4 transition-all md:col-span-3 md:gap-0 md:border-r md:border-border">
				<div className="flex items-center justify-between border-b border-border p-2 pl-4">
					<h2 className="text-lg font-bold">{title}</h2>
					<EditButton isEdit={false} newItem={true} path={path} />
				</div>
				<div className="px-4 md:hidden">
					<Select>
						<SelectTrigger>
							<SelectValue placeholder="Section" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="item1">Item 1</SelectItem>
							<SelectItem value="item2">Item 2</SelectItem>
							<SelectItem value="item3">Item 3</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className="hidden md:block">
					{data.map((d: any) => (
						<div key={d.id}>
							<NavItem eq={true} to={`${path}/${d.id}`}>
								{d[listBy]}
							</NavItem>
						</div>
					))}
				</div>
			</div>
			{children}
		</>
	);
}
