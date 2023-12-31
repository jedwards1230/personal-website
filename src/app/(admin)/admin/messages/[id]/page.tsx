import ExperienceForm from "@/components/Forms/ExperienceForm";
import ProjectForm from "@/components/Forms/ProjectForm";
import ExperienceView from "@/components/Views/ExperienceView";
import ProjectView from "@/components/Views/ProjectView";
import EditButton from "@/components/buttons/EditButton";
import { getAllMessages } from "@/models/contact.server";
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
}: {
	params: { section: keyof typeof SECTIONS; id: number };
}) {
	const data = await getAllMessages();
	const message = data.find((m: any) => m.id === Number(params.id));

	if (!message) {
		return <div>Not found</div>;
	}
	return (
		<div className="w-full relative p-4 overflow-y-scroll col-span-9 lg:col-span-7">
			{!true && (
				<div className="absolute top-4 right-4">
					<EditButton isEdit={false} />
				</div>
			)}
			<div className="space-y-2">
				<div className="space-y-1">
					<div className="font-bold">Name</div>
					<div>{message.name}</div>
				</div>
				<div className="space-y-1">
					<div className="font-bold">Email</div>
					<div>{message.email}</div>
				</div>
				<div className="space-y-1">
					<div className="font-bold">Message</div>
					<div>{message.message}</div>
				</div>
			</div>
		</div>
	);
}
