import {
	type ActionFunctionArgs,
	type LoaderFunction,
	json,
	redirect,
} from "@remix-run/node";
import {
	Form,
	NavLink,
	Outlet,
	useLoaderData,
	useParams,
} from "@remix-run/react";
import clsx from "clsx";
import { Plus } from "lucide-react";

import { requireAdminSession } from "@/session.server";
import { getAllProjects } from "@/models/project.server";
import { invariant } from "@/utils";
import {
	createExperience,
	getAllExperiences,
} from "@/models/experience.server";
import { Button } from "@/components/ui/button";

const SECTIONS = {
	projects: {
		getData: () => getAllProjects("title"),
		create: () => {},
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

	const { path, listBy, title } = SECTIONS[section];

	return (
		<>
			<div className="flex col-span-3 border-r border-border flex-col">
				<div className="flex p-2 pl-4 border-b border-border justify-between items-center">
					<h2 className="text-lg font-bold">{title}</h2>
					<Form method="post">
						<Button variant="outline" size="icon">
							<Plus />
						</Button>
					</Form>
				</div>
				{data.map((d: any) => (
					<div key={d.id}>
						<NavLink
							to={`${path}/${d.id}`}
							className={({ isActive, isPending }) =>
								clsx(
									isPending || isActive
										? "bg-foreground text-background hover:bg-foreground/70"
										: "hover:bg-secondary focus:bg-foreground/30",
									"w-full transition-all duration-100 block py-2 cursor-pointer capitalize pl-4"
								)
							}
						>
							{d[listBy]}
						</NavLink>
					</div>
				))}
			</div>
			<Outlet />
		</>
	);
}

export async function action({ request, params }: ActionFunctionArgs) {
	const { section } = params as { section: keyof typeof SECTIONS };
	invariant(section, "No section provided");

	if (request.method.toUpperCase() === "POST") {
		const id = await SECTIONS[section].create();
		return redirect(`${SECTIONS[section].path}/${id}?edit=true`);
	}

	return {};
}
