import {
	type ActionFunctionArgs,
	json,
	type LoaderFunction,
} from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { AlignJustify, AlignLeft } from "lucide-react";

import { requireAdminSession } from "@/session.server";
import { getAllExperiences } from "@/models/experience.server";
import ExperienceView from "@/components/Views/ExperienceView";
import ExperienceForm, {
	handleExperienceFormSubmit,
} from "@/components/Forms/ExperienceForm";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { SelectIcon } from "@radix-ui/react-select";
import { useState } from "react";

export const loader: LoaderFunction = async ({ request }) => {
	try {
		await requireAdminSession(request);
		return json(await getAllExperiences("company"));
	} catch (error) {
		return error;
	}
};

type ViewMode = "simple" | "expanded";

export default function DataSections() {
	const data = useLoaderData<typeof loader>();
	const [viewMode, setViewMode] = useState<ViewMode>("simple");

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
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<div className="flex flex-col gap-2">
					<h2 className="text-xl capitalize font-semibold">
						Experience
					</h2>
					<p className="text-sm text-gray-500">
						Edit the experience section of the website.
					</p>
				</div>
				<Select
					value={viewMode}
					onValueChange={(e) => setViewMode(e as ViewMode)}
				>
					<SelectTrigger className="w-[180px]">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="simple">
							<SelectIcon>
								<AlignJustify />
							</SelectIcon>{" "}
							Simple
						</SelectItem>
						<SelectItem value="expanded">
							<SelectIcon>
								<AlignLeft />
							</SelectIcon>{" "}
							Expanded
						</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{isEdit ? (
				<ExperienceForm data={data} />
			) : (
				<ExperienceView data={data} minimal={viewMode === "simple"} />
			)}
		</div>
	);
}

export async function action({ request }: ActionFunctionArgs) {
	return handleExperienceFormSubmit(request);
}
