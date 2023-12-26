import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateExperience } from "@/models/experience.server";
import { Label } from "@/components/ui/label";

export default function ExperienceForm({ data }: { data: Experience }) {
	const actionData = useActionData() as any;

	return (
		<Form method="post">
			<div className="grid gap-2 pb-4 sm:gap-4">
				<div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-4">
					<div className="col-span-3">
						<Label>Title</Label>
						<Input name="title" defaultValue={data.title} />
						{actionData?.errors?.title && (
							<p className="text-destructive">
								{actionData.errors.title}
							</p>
						)}
					</div>
					<div className="col-span-3">
						<Label>Company</Label>
						<Input name="company" defaultValue={data.company} />
						{actionData?.errors?.company && (
							<p className="text-destructive">
								{actionData.errors.company}
							</p>
						)}
					</div>
				</div>
				<div className="col-span-3">
					<Label>Period</Label>
					<Input name="period" defaultValue={data.period} />
					{actionData?.errors?.period && (
						<p className="text-destructive">
							{actionData.errors.period}
						</p>
					)}
				</div>
				<div className="col-span-3">
					<Label>Summary</Label>
					<Textarea
						className="h-24"
						name="summary"
						defaultValue={data.summary}
					/>
					{actionData?.errors?.summary && (
						<p className="text-destructive">
							{actionData.errors.summary}
						</p>
					)}
				</div>
				<div className="col-span-3">
					<Label>Description</Label>
					<Textarea
						className="h-64"
						name="description"
						defaultValue={data.description.join("\n")}
					/>
					{actionData?.errors?.description && (
						<p className="text-destructive">
							{actionData.errors.description}
						</p>
					)}
				</div>
				<div className="col-span-3">
					<Label>Tags</Label>
					<Input name="tags" defaultValue={data.tags.join(", ")} />
					{actionData?.errors?.tags && (
						<p className="text-destructive">
							{actionData.errors.tags}
						</p>
					)}
				</div>
				<div className="col-span-3">
					<Label>Extra Tags</Label>
					<Input
						name="extraTags"
						defaultValue={data.extraTags?.join(", ")}
					/>
				</div>
			</div>
			<div className="flex w-full justify-between">
				<input type="hidden" name="id" value={data.id} />
				<Button type="button" variant="destructive">
					Delete
				</Button>
				<Button type="submit">Save</Button>
			</div>
		</Form>
	);
}

export const handleExperienceFormSubmit = async (request: Request) => {
	const formData = await request.formData();

	const id = Number(formData.get("id"));
	const title = String(formData.get("title"));
	const company = String(formData.get("company"));
	const period = String(formData.get("period"));
	const summary = String(formData.get("summary"));
	const description = String(formData.get("description"));
	const tags = String(formData.get("tags"));
	const extraTags = String(formData.get("extraTags"));

	const errors: Record<string, string> = {};

	if (!id) errors.id = "ID is required.";
	if (!title) errors.title = "Title is required.";
	if (!company) errors.company = "Company is required.";
	if (!period) errors.period = "Period is required.";
	if (!summary) errors.summary = "Summary is required.";
	if (!tags) errors.tags = "Tags are required.";
	if (!description) errors.description = "Description is required.";

	if (Object.keys(errors).length > 0) {
		console.log(errors);
		return json({ errors });
	}

	try {
		await updateExperience({
			id,
			title,
			company,
			period,
			summary,
			description: description.split("\n"),
			tags: tags.split(",").map((tag) => tag.trim()),
			extraTags: extraTags.split(",").map((tag) => tag.trim()),
		});
		return true;
	} catch (error: any) {
		return json({ error: "Failed to send message." }, { status: 400 });
	}
};
