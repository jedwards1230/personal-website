import SectionTitle from "./SectionTitle";
import { getAbout } from "@/models/about.server";
import ContactForm from "@/components/Forms/ContactForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PageViews from "./PageViews";

const ID = "contact";

export default async function Contact() {
	const about = await getAbout();
	const linkedInUsername = about.linkedin.replace(/\/$/, "").split("/").pop();
	const githubUsername = about.github.replace(/\/$/, "").split("/").pop();

	return (
		<section
			id={ID}
			className="flex min-h-screen py-2 flex-col gap-4 sm:py-16 md:gap-8"
		>
			<SectionTitle id={ID} />
			<div className="flex flex-col gap-4 md:gap-8 md:justify-between md:mt-4 md:flex-row">
				<div className="pb-8 space-y-12">
					<div className="space-y-4">
						<p>I am currently looking for new opportunities.</p>
						<p>Feel free to reach out!</p>
					</div>
					<div className="space-y-4">
						<p>
							Email:{" "}
							<a
								className="hover:underline"
								href={
									"mailto:" + about.email + "?subject=Hello!"
								}
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
					</div>
					<Button
						className="!px-0 !py-0 !h-6 mr-auto font-semibold"
						asChild
						size="sm"
						variant="link"
					>
						<Link href="/cv">View my CV</Link>
					</Button>
				</div>
				<ContactForm />
			</div>
			<PageViews />
		</section>
	);
}
