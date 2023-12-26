import {
	type ActionFunctionArgs,
	json,
	type LoaderFunction,
} from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { Edit } from "lucide-react";

import { requireAdminSession } from "@/session.server";
import { getAbout } from "@/models/about.server";
import { Button } from "@/components/ui/button";
import AboutForm, { handleAboutFormSubmit } from "@/components/Forms/AboutForm";
import AboutView from "@/components/Views/AboutView";

export const loader: LoaderFunction = async ({ request }) => {
	try {
		await requireAdminSession(request);
		return json(await getAbout());
	} catch (error) {
		return error;
	}
};

export default function DataSections() {
	const data = useLoaderData<typeof loader>();

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
		<div className="flex col-span-10 p-4 flex-col gap-4">
			<div className="flex justify-between">
				<div className="flex flex-col gap-2">
					<h2 className="text-xl capitalize font-semibold">About</h2>
					<p className="text-sm text-gray-500">
						Edit the about section of the website.
					</p>
				</div>
				<Button
					size="icon"
					variant={isEdit ? "destructive" : "outline"}
					onClick={toggleEditMode}
				>
					<Edit />
				</Button>
			</div>

			{isEdit ? <AboutForm data={data} /> : <AboutView data={data} />}
		</div>
	);
}

export async function action({ request }: ActionFunctionArgs) {
	return handleAboutFormSubmit(request);
}
