import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateAbout } from "@/models/about.server";
import { Label } from "@/components/ui/label";

export const handleAboutFormSubmit = async (formData: FormData) => {
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

	if (isNaN(id)) errors.id = "ID is required.";
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
		return { errors };
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
		return { success: "Updated successfully!" };
	} catch (error: any) {
		return { error: "Failed to send message." };
	}
};

export default function AboutForm({ data }: { data: About }) {
	const isSending = false;
	const submission = {} as {
		success?: string;
		error?: string;
		errors?: Record<string, string>;
	};

	return (
		<form method="post" className="space-y-2 sm:space-y-4">
			<div className="grid w-full grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-4">
				<div className="col-span-3">
					<Label>Name</Label>
					<Input defaultValue={data.name} name="name" />
				</div>
				<div className="col-span-3">
					<Label>Title</Label>
					<Input defaultValue={data.title} name="title" />
				</div>
			</div>
			<div className="col-span-3">
				<Label>Location</Label>
				<Input defaultValue={data.location} name="location" />
			</div>
			<div className="grid w-full grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-4">
				<div className="col-span-3">
					<Label>Email</Label>
					<Input
						defaultValue={data.email}
						type="email"
						name="email"
					/>
				</div>
				<div className="col-span-3">
					<Label>Phone</Label>
					<Input defaultValue={data.phone} type="tel" name="phone" />
				</div>
			</div>
			<div className="grid w-full grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-4">
				<div className="col-span-3">
					<Label>LinkedIn</Label>
					<Input defaultValue={data.linkedin} name="linkedin" />
				</div>
				<div className="col-span-3">
					<Label>GitHub</Label>
					<Input defaultValue={data.github} name="github" />
				</div>
			</div>
			<div className="col-span-3">
				<Label>Tags</Label>
				<Input defaultValue={data.tags} name="tags" />
			</div>
			<div className="hidden col-span-3">
				<Label>Bio</Label>
				<Textarea
					defaultValue={data.description}
					className="h-64"
					name="description"
				/>
			</div>
			<input type="hidden" name="id" value={data.id} />
			<Button disabled={isSending} type="submit">
				Save
			</Button>
			<div className="pt-2 text-center">
				{submission?.success && (
					<p className="text-green-500">{submission.success}</p>
				)}
				{submission?.errors?.id && (
					<p className="text-red-500">{submission.errors?.id}</p>
				)}
				{submission?.error && (
					<p className="text-red-500">{submission.error}</p>
				)}
			</div>
		</form>
	);
}
