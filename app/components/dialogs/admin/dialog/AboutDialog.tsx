import { useState } from "react";
import { json, useFetcher } from "@remix-run/react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateAbout } from "@/models/about.server";
import { Label } from "@/components/ui/label";

export const handleAboutFormSubmit = async (request: Request) => {
	const formData = await request.formData();
	const id = Number(formData.get("id"));
	const name = String(formData.get("name"));
	const title = String(formData.get("title"));
	const location = String(formData.get("location"));
	const email = String(formData.get("email"));
	const phone = String(formData.get("phone"));
	const linkedin = String(formData.get("linkedin"));
	const github = String(formData.get("github"));
	const tags = String(formData.get("tags"));
	const description = String(formData.get("description"));

	const errors: Record<string, string> = {};

	if (!id) errors.id = "ID is required.";
	if (!name) errors.name = "Name is required.";
	if (!title) errors.title = "Title is required.";
	if (!location) errors.location = "Location is required.";
	if (!email) errors.email = "Email is required.";
	if (!email.includes("@")) errors.email = "Email is invalid.";
	if (!phone) errors.phone = "Phone is required.";
	if (!linkedin) errors.linkedin = "LinkedIn is required.";
	if (!github) errors.github = "GitHub is required.";
	if (!tags) errors.tags = "Tags are required.";
	if (!description) errors.description = "Description is required.";

	if (Object.keys(errors).length > 0) {
		return json({ errors });
	}

	try {
		await updateAbout({
			id,
			name,
			title,
			location,
			email,
			phone,
			linkedin,
			github,
			tags: tags.split(","),
			description,
		});
		return json({ success: "Updated successfully!" });
	} catch (error: any) {
		return json({ error: "Failed to send message." }, { status: 400 });
	}
};

export default function AboutDialog({
	children,
	about,
}: {
	children: React.ReactNode;
	about: About;
}) {
	const [open, setOpen] = useState(false);
	const fetcher = useFetcher();
	const isSending = fetcher.state !== "idle";
	const submission = fetcher.data as {
		success?: string;
		error?: string;
		errors?: Record<string, string>;
	};

	return (
		<Dialog open={open} onOpenChange={(o) => setOpen(o)}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="max-h-screen overflow-y-scroll sm:max-h-[95%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
				<DialogHeader>
					<DialogTitle className="flex gap-6">Message</DialogTitle>
				</DialogHeader>
				<fetcher.Form method="post" className="space-y-2 sm:space-y-4">
					<div className="grid w-full grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-4">
						<div className="col-span-3">
							<Label>Name</Label>
							<Input name="name" />
						</div>
						<div className="col-span-3">
							<Label>Title</Label>
							<Input name="title" />
						</div>
					</div>
					<div className="col-span-3">
						<Label>Location</Label>
						<Input name="location" />
					</div>
					<div className="grid w-full grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-4">
						<div className="col-span-3">
							<Label>Email</Label>
							<Input type="email" name="email" />
						</div>
						<div className="col-span-3">
							<Label>Phone</Label>
							<Input type="tel" name="phone" />
						</div>
					</div>
					<div className="grid w-full grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-4">
						<div className="col-span-3">
							<Label>LinkedIn</Label>
							<Input name="linkedin" />
						</div>
						<div className="col-span-3">
							<Label>GitHub</Label>
							<Input name="github" />
						</div>
					</div>
					<div className="col-span-3">
						<Label>Tags</Label>
						<Input name="tags" />
					</div>
					<div className="col-span-3">
						<Label>Bio</Label>
						<Textarea className="h-64" name="description" />
					</div>
					<input type="hidden" name="id" value={about.id} />
					<input type="hidden" name="action" value="about" />
					<Button disabled={isSending} type="submit">
						Save
					</Button>
					<div className="pt-2 text-center">
						{submission?.success && (
							<p className="text-green-500">
								{submission.success}
							</p>
						)}
						{submission?.error && (
							<p className="text-red-500">{submission.error}</p>
						)}
					</div>
				</fetcher.Form>
			</DialogContent>
		</Dialog>
	);
}
