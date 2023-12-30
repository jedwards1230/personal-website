import { Suspense } from "react";

import Contact from "./Contact";
import ProjectsList from "./ProjectsList";
import Intro from "./Intro";
import { AdminButton } from "@/components/buttons/AdminButton";

export default async function Page() {
	return (
		<>
			<div className="fixed bottom-8 right-8 z-10 flex flex-col items-center justify-center gap-4 sm:bottom-12">
				<AdminButton />
			</div>
			<div className="max-w-screen select-none flex w-full flex-col justify-between gap-4 px-4 pt-8 sm:px-8 md:h-full md:px-12 md:pt-0 lg:px-24 xl:px-32">
				<Intro />
				<Suspense fallback={null}>
					<ProjectsList />
				</Suspense>
				<Suspense fallback={null}>
					<Contact />
				</Suspense>
			</div>
		</>
	);
}
