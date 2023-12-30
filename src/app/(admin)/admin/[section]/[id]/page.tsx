import ExperienceForm from "@/components/Forms/ExperienceForm";
import ProjectForm from "@/components/Forms/ProjectForm";
import ExperienceView from "@/components/Views/ExperienceView";
import ProjectView from "@/components/Views/ProjectView";
import EditButton from "@/components/buttons/EditButton";
import { getExperienceById } from "@/models/experience.server";
import { getProjectById } from "@/models/project.server";

const SECTIONS = {
	projects: {
		getData: getProjectById,
		View: ProjectView,
		Form: ProjectForm,
	},
	experience: {
		getData: getExperienceById,
		View: ExperienceView,
		Form: ExperienceForm,
	},
};

export default async function Page({
	params,
	searchParams,
}: {
	params: { section: keyof typeof SECTIONS; id: number };
	searchParams: { edit: "true" | "false" } | undefined;
}) {
	const { View, Form, getData } = SECTIONS[params.section];

	const isEdit = searchParams?.edit === "true";
	const data = await getData(Number(params.id));

	return (
		<div className="w-full relative p-4 overflow-y-scroll col-span-9 lg:col-span-7">
			{!isEdit && (
				<div className="absolute top-4 right-4">
					<EditButton isEdit={isEdit} />
				</div>
			)}
			{isEdit ? (
				// @ts-ignore
				<Form data={data} />
			) : (
				// @ts-ignore
				<View data={data} />
			)}
		</div>
	);
}
