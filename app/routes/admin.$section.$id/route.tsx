import { type ActionFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, useParams, useSearchParams } from "@remix-run/react";

import ExperienceView from "@/components/Views/ExperienceView";
import { getExperienceById } from "@/models/experience.server";
import { invariant } from "@/utils";
import { getProjectById } from "@/models/project.server";
import { requireAdminSession } from "@/session.server";
import ProjectView from "@/components/Views/ProjectView";
import ProjectForm from "@/components/Forms/ProjectForm";
import ExperienceForm from "@/components/Forms/ExperienceForm";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

const SECTIONS = {
	projects: {
		getData: getProjectById,
		View: ProjectView,
		Form: ProjectForm,
		title: "Projects",
	},
	experience: {
		getData: getExperienceById,
		View: ExperienceView,
		Form: ExperienceForm,
		title: "Experience",
	},
};

type PageParams = {
	section: keyof typeof SECTIONS;
	id: string;
};

export async function loader({ request, params }: ActionFunctionArgs) {
	await requireAdminSession(request);
	const { section, id } = params as PageParams;
	invariant(section, "No section provided");
	invariant(id, "No id provided");
	const data = await SECTIONS[section].getData(Number(id));
	return json({ data });
}

export default function ExperienceID() {
	const params = useParams<PageParams>();
	const { section, id } = params;
	invariant(section, "No section provided");
	const ActiveSection = SECTIONS[section];

	const { data } = useLoaderData<typeof loader>() as any;
	const [searchParams, setSearchParams] = useSearchParams();
	const isEdit = searchParams.get("edit") === "true";

	const toggleEditMode = () => {
		if (isEdit) {
			const params = new URLSearchParams(searchParams);
			params.delete("edit");
			setSearchParams(params);
		} else {
			const params = new URLSearchParams(searchParams);
			params.set("edit", "true");
			setSearchParams(params);
		}
	};

	return (
		<div className="w-full relative p-4 overflow-y-scroll col-span-7">
			{!isEdit && (
				<Button
					onClick={toggleEditMode}
					className="absolute top-4 right-4"
					variant="ghost"
					size="icon"
				>
					<Edit />
				</Button>
			)}
			{isEdit ? (
				<ActiveSection.Form data={data} />
			) : (
				<ActiveSection.View data={data} />
			)}
		</div>
	);
}
