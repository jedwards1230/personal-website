import { Suspense } from "react";

import Contact from "./Contact";
import ProjectsList from "./ProjectsList";
import Intro from "./Intro";
import { AdminButton } from "@/components/buttons/AdminButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
	return (
		<>
			{/* <div className="fixed bottom-0 py-8 right-2 md:right-6 lg:right-10 z-10 flex flex-col h-full items-center justify-between gap-4">
				<Button asChild variant="link">
					<Link href="/cv">cv</Link>
				</Button>
				<AdminButton />
			</div> */}
			<div className="max-w-screen select-none flex w-full flex-col justify-between gap-4 px-4 pt-8 sm:px-8 md:h-full md:px-16 md:pt-0 lg:px-24 xl:px-32">
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
