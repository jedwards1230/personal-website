import { json, useFetcher } from "@remix-run/react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createContact } from "@/models/contact.server";

import DownloadResume from "./DownloadResume";
import SectionTitle from "./SectionTitle";

const ID = "contact";

export default function Contact({
	about,
	pageViews,
}: {
	about: About;
	pageViews: number;
}) {
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
					<DownloadResume />
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

export const handleFormSubmit = async (request: Request) => {
	const formData = await request.formData();
	const name = String(formData.get("name"));
	const email = String(formData.get("email"));
	const message = String(formData.get("message"));

	if (!message) {
		return json({ error: "Message is required." }, { status: 400 });
	}

	try {
		await createContact(name ?? "", email ?? "", message);
		return json({ success: "Message sent successfully!" });
	} catch (error: any) {
		return json({ error: "Failed to send message." }, { status: 400 });
	}
};

function ContactForm() {
	const fetcher = useFetcher();
	const isSending = fetcher.state !== "idle";
	const submission = fetcher.data as { success?: string; error?: string };

	return (
		<fetcher.Form
			method="post"
			className="flex h-full w-full flex-1 flex-col justify-between"
		>
			<div className="flex w-full select-none flex-col gap-2">
				<p className="mb-2 text-lg">Leave a message</p>

				<div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
					<Label>Name</Label>
					<Input name="name" className="md:w-2/3" />
				</div>
				<div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
					<Label>Email</Label>
					<Input className="md:w-2/3" type="email" name="email" />
				</div>
				<div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
					<Label>Message</Label>
					<Textarea name="message" className="md:w-2/3" rows={5} />
				</div>
				<Button disabled={isSending} variant="ghost" type="submit">
					Send
				</Button>
				<div className="pt-2 text-center">
					{submission?.success && (
						<p className="text-green-500">{submission.success}</p>
					)}
					{submission?.error && (
						<p className="text-red-500">{submission.error}</p>
					)}
				</div>
			</div>
		</fetcher.Form>
	);
}
