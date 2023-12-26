import {
	type ActionFunctionArgs,
	json,
	type LoaderFunction,
} from "@remix-run/node";
import { NavLink, Outlet, useLoaderData, useParams } from "@remix-run/react";
import clsx from "clsx";

import { requireAdminSession } from "@/session.server";
import { handleProjectFormSubmit } from "@/components/Forms/ProjectForm";
import { getAllProjects } from "@/models/project.server";
import { invariant } from "@/utils";
import { getAllExperiences } from "@/models/experience.server";

const SECTIONS = {
	projects: {
		getData: () => getAllProjects("title"),
		path: "/admin/projects",
	},
	experience: {
		getData: () => getAllExperiences("company"),
		path: "/admin/experience",
	},
};

export const loader: LoaderFunction = async ({ request, params }) => {
	await requireAdminSession(request);
	const { section } = params as { section: keyof typeof SECTIONS };
	invariant(section, "No section provided");
	const data = await SECTIONS[section].getData();
	return json({ data });
};

export default function DataSections() {
	const params = useParams();
	const { section } = params as { section: keyof typeof SECTIONS };
	const { data } = useLoaderData<typeof loader>();

	return (
		<>
			<div className="flex col-span-3 border-r border-border flex-col">
				{data.map((project: any) => (
					<div key={project.id}>
						<NavLink
							to={`${SECTIONS[section].path}/${project.id}`}
							className={({ isActive, isPending }) =>
								clsx(
									isPending || isActive
										? "bg-secondary hover:bg-secondary/80"
										: "",
									"w-full block py-2 hover:bg-secondary cursor-pointer capitalize pl-4"
								)
							}
						>
							{project.title}
						</NavLink>
					</div>
				))}
			</div>
			<Outlet />
		</>
	);
}

export async function action({ request }: ActionFunctionArgs) {
	return handleProjectFormSubmit(request);
}
