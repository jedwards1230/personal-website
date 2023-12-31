import AboutForm from "@/components/Forms/AboutForm";
import EditButton from "@/components/buttons/EditButton";
import AboutView from "@/components/Views/AboutView";
import { getAbout } from "@/models/about.server";

export default async function Page({
	searchParams,
}: {
	searchParams: { edit: "true" | "false" } | undefined;
}) {
	const isEdit = searchParams?.edit === "true";
	const data = await getAbout();

	return (
		<div className="flex overflow-y-scroll col-span-12 lg:col-span-10 p-4 flex-col gap-4">
			<div className="flex justify-between">
				<div className="flex flex-col gap-2">
					<h2 className="text-xl capitalize font-semibold">About</h2>
					<p className="text-sm text-gray-500">
						Edit the about section of the website.
					</p>
				</div>
				<EditButton isEdit={isEdit} />
			</div>

			{isEdit ? <AboutForm data={data} /> : <AboutView data={data} />}
		</div>
	);
}
