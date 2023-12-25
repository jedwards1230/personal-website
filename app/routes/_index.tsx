import {
	type ActionFunction,
	json,
	type LoaderFunctionArgs,
	type MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import Intro from "@/components/Intro";
import Projects from "@/components/Projects";
import { getPageViews } from "@/data";
import Contact, { handleFormSubmit } from "@/components/Contact";
import { getAbout } from "@/models/about.server";
import { getAllProjects } from "@/models/project.server";
import { AdminButton } from "@/components/buttons/AdminButton";
import { isAuthenticated } from "@/session.server";

export const meta: MetaFunction = () => {
	return [
		{ title: "J. Edwards" },
		{
			name: "description",
			content: "Portfolio Website For Justin Edwards",
		},
	];
};

export async function loader({ request }: LoaderFunctionArgs) {
	const [projects, pageViews, about] = await Promise.all([
		getAllProjects("id"),
		getPageViews(),
		getAbout(),
	]);
	const authenticated = await isAuthenticated(request);
	return json({
		projects,
		pageViews,
		about,
		authenticated,
	});
}

export default function Index() {
	const { projects, pageViews, about, authenticated } =
		useLoaderData<typeof loader>();

	return (
		<>
			<div className="fixed bottom-8 right-8 z-10 flex flex-col items-center justify-center gap-4 sm:bottom-12">
				<AdminButton isAuthenticated={authenticated} />
				{/* <ThemeToggle /> */}
			</div>
			<div className="max-w-screen flex w-full flex-col justify-between gap-4 px-4 pt-8 sm:px-8 md:h-full md:px-12 md:pt-0 lg:px-24 xl:px-32">
				<Intro about={about} />
				<Projects projects={projects} />
				<Contact about={about} pageViews={pageViews} />
			</div>
		</>
	);
}

export const action: ActionFunction = async ({ request }) => {
	await handleFormSubmit(request);
};
