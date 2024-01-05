import AboutForm from "@/components/Forms/AboutForm";
import EditButton from "@/components/buttons/EditButton";
import AboutView from "@/components/Views/AboutView";
import { getAbout } from "@/models/about.server";
import { getAllEducations } from "@/models/education.server";
import EducationForm from "@/components/Forms/EducationForm";
import EducationView from "@/components/Views/EducationView";

export const runtime = "edge";

export default async function Page({
	searchParams,
}: {
	searchParams: { edit: "true" | "new" } | undefined;
}) {
	const isEdit = searchParams?.edit === "true";
	const isNew = searchParams?.edit === "new";
	const data = await getAbout();
	const educations = await getAllEducations();

	return (
		<div className="col-span-12 flex flex-col gap-4 overflow-y-scroll p-2 md:p-4 lg:col-span-10">
			<div className="flex justify-between">
				<div className="flex flex-col gap-2">
					<h2 className="text-xl font-semibold capitalize">About</h2>
					<p className="text-sm text-gray-500">
						Edit the about section of the website.
					</p>
				</div>
				<EditButton isEdit={isEdit} />
			</div>

			{isEdit ? <AboutForm data={data} /> : <AboutView data={data} />}

			<div className="flex justify-between">
				<div className="flex flex-col gap-2">
					<h2 className="text-xl font-semibold capitalize">
						Education
					</h2>
					<p className="text-sm text-gray-500">
						Edit the education section of the website.
					</p>
				</div>
				<EditButton isEdit={isEdit} newItem={true} />
			</div>

			{isNew && <EducationForm />}

			{educations.map(education => (
				<div key={education.id}>
					{isEdit ? (
						<EducationForm data={education} />
					) : (
						<EducationView data={education} />
					)}
				</div>
			))}
		</div>
	);
}
