import {
	type ActionFunctionArgs,
	json,
	type LoaderFunction,
} from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { AlignJustify, AlignLeft, Edit } from "lucide-react";

import { requireAdminSession } from "@/session.server";
import { Button } from "@/components/ui/button";
import ProjectForm, {
	handleProjectFormSubmit,
} from "@/components/Forms/ProjectForm";
import ProjectView from "@/components/Views/ProjectView";
import { getAllProjects } from "@/models/project.server";
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
		return json(await getAllProjects("title"));
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
						Projects
					</h2>
					<p className="text-sm text-gray-500">
						Edit the projects section of the website.
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
				<ProjectForm data={data} />
			) : (
				<ProjectView data={data} minimal={viewMode === "simple"} />
			)}
		</div>
	);
}

export async function action({ request }: ActionFunctionArgs) {
	return handleProjectFormSubmit(request);
}
