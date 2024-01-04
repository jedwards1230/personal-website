import ExperienceForm from "@/components/Forms/ExperienceForm";
import ProjectForm from "@/components/Forms/ProjectForm";
import ExperienceView from "@/components/Views/ExperienceView";
import ProjectView from "@/components/Views/ProjectView";
import EditButton from "@/components/buttons/EditButton";
import { getExperienceById } from "@/models/experience.server";
import { getProjectById } from "@/models/project.server";

export const dynamic = "force-dynamic";

const SECTIONS: {
	[section: string]: {
		getData: (id: number) => Promise<any>;
		View: React.FC<{ data: any }>;
		Form: React.FC<{ data: any }>;
	};
} = {
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
	params: { section: keyof typeof SECTIONS; id: string };
	searchParams: { edit: "true" | "false" } | undefined;
}) {
	const { View, Form, getData } = SECTIONS[params.section];

	const isEdit = searchParams?.edit === "true";
	const data = params.id !== "new" ? await getData(Number(params.id)) : null;

	return (
		<div className="w-full relative p-4 overflow-y-scroll col-span-9 lg:col-span-7">
			{!isEdit && data && (
				<div className="absolute top-4 right-4">
					<EditButton isEdit={isEdit} />
				</div>
			)}
			{isEdit || !data ? <Form data={data} /> : <View data={data} />}
		</div>
	);
}
