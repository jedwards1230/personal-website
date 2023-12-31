import { getAbout } from "@/models/about.server";
import { getAllProjects } from "@/models/project.server";
import { getAllExperiences } from "@/models/experience.server";
import dynamic from "next/dynamic";

const MyPdf = dynamic(() => import("./PdfViewer"), { ssr: false });

export default async function Page() {
	const [about, projects, experiences] = await Promise.all([
		await getAbout(),
		await getAllProjects("id"),
		await getAllExperiences("id"),
	]);

	return (
		<>
			<div className="w-full flex flex-col gap-2 h-full col-span-2">
				<div>
					<div className="underline">Experiences</div>
					<div>
						{experiences.map(e => (
							<div key={e.id}>{e.title}</div>
						))}
					</div>
				</div>
				<div>
					<div className="underline">Projects</div>
					<div>
						{projects.map(p => (
							<div key={p.id}>{p.title}</div>
						))}
					</div>
				</div>
			</div>
			<div className="w-full h-full col-span-8">
				<MyPdf data={{ about, projects, experiences }} />
			</div>
		</>
	);
}
