import SectionTitle from "./SectionTitle";
import { getAbout } from "@/models/about.server";
import { getPageViews } from "@/lib/utils";
import ContactForm from "@/components/Forms/ContactForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ID = "contact";

export default async function Contact() {
	const about = await getAbout();
	const pageViews = await getPageViews();
	const linkedInUsername = about.linkedin.replace(/\/$/, "").split("/").pop();
	const githubUsername = about.github.replace(/\/$/, "").split("/").pop();

	return (
		<section
			id={ID}
			className="flex h-full min-h-full flex-col gap-4 sm:py-16 md:justify-between md:gap-8"
		>
			<SectionTitle id={ID} />
			<div className="flex flex-col gap-4 md:mt-4 md:flex-row">
				<div className="flex flex-col justify-start gap-4 md:w-1/2">
					<p>
						I am currently looking for new opportunities. Feel free
						to reach out!
					</p>
					<p>
						Email:{" "}
						<a
							className="hover:underline"
							href={"mailto:" + about.email + "?subject=Hello!"}
							target="_blank"
							rel="noreferrer"
						>
							{about.email}
						</a>
					</p>
					<p>
						LinkedIn:{" "}
						<a
							className="hover:underline"
							href={about.linkedin}
							target="_blank"
							rel="noreferrer"
						>
							{"@" + linkedInUsername}
						</a>
					</p>
					<p>
						GitHub:{" "}
						<a
							className="hover:underline"
							href={about.github}
							target="_blank"
							rel="noreferrer"
						>
							{"@" + githubUsername}
						</a>
					</p>
					<Button
						className="!px-0 !py-0 !h-6 text-lg mr-auto font-medium"
						asChild
						size="sm"
						variant="link"
					>
						<Link href="/cv">View my cv</Link>
					</Button>
				</div>
				<ContactForm />
			</div>
			<div
				aria-label="Page Views"
				className="mb-8 mt-auto select-none text-center text-xs text-neutral-600 dark:text-neutral-500"
			>
				{pageViews} {pageViews === 1 ? "visit" : "visits"} this week
			</div>
		</section>
	);
}
