import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { updateProject } from "@/models/project.server";
import { Label } from "@/components/ui/label";

export default function ProjectForm({ data }: { data: Project }) {
	const actionData = useActionData() as any;

	return (
		<Form method="post">
			<div className="grid gap-2 pb-4 sm:gap-4">
				<div>
					<Label>Title</Label>
					<Input name="title" defaultValue={data.title} />
					{actionData?.errors?.title && (
						<p className="text-destructive">
							{actionData.errors.title}
						</p>
					)}
				</div>
				<div className="flex gap-4 justify-between">
					<div className="w-full">
						<Label>Company</Label>
						<Input name="company" defaultValue={data.company} />
						{actionData?.errors?.company && (
							<p className="text-destructive">
								{actionData.errors.company}
							</p>
						)}
					</div>
					<div className="w-full">
						<Label>Client</Label>
						<Input name="client" defaultValue={data.client ?? ""} />
						{actionData?.errors?.client && (
							<p className="text-destructive">
								{actionData.errors.client}
							</p>
						)}
					</div>
				</div>
				<div>
					<Label>Link</Label>
					<Input name="href" defaultValue={data.href ?? ""} />
					{actionData?.errors?.href && (
						<p className="text-destructive">
							{actionData.errors.href}
						</p>
					)}
				</div>
				<div className="flex gap-4 justify-between">
					<div className="w-full">
						<Label>Month</Label>
						<Input name="month" defaultValue={data.month} />
						{actionData?.errors?.month && (
							<p className="text-destructive">
								{actionData.errors.month}
							</p>
						)}
					</div>
					<div className="w-full">
						<Label>Year</Label>
						<Input name="year" defaultValue={data.year} />
						{actionData?.errors?.year && (
							<p className="text-destructive">
								{actionData.errors.year}
							</p>
						)}
					</div>
				</div>
				<div>
					<Label>Tags</Label>
					<Input name="tags" defaultValue={data.tags.join(", ")} />
					{actionData?.errors?.tags && (
						<p className="text-destructive">
							{actionData.errors.tags}
						</p>
					)}
				</div>
				<div>
					<Label>Images</Label>
					<Input
						name="images"
						defaultValue={data.images.join(", ")}
					/>
					{actionData?.errors?.images && (
						<p className="text-destructive">
							{actionData.errors.images}
						</p>
					)}
				</div>
				<div>
					<Label>Showcase</Label>
					<Checkbox
						name="showcase"
						defaultChecked={data.showcase ?? false}
					/>
					{actionData?.errors?.showcase && (
						<p className="text-destructive">
							{actionData.errors.showcase}
						</p>
					)}
				</div>
				<div>
					<Label>Favorite</Label>
					<Checkbox
						name="favorite"
						defaultChecked={data.favorite ?? false}
					/>
					{actionData?.errors?.favorite && (
						<p className="text-destructive">
							{actionData.errors.favorite}
						</p>
					)}
				</div>
				<div>
					<Label>Description</Label>
					<Textarea
						className="h-32"
						name="description"
						defaultValue={data.description}
					/>
					{actionData?.errors?.description && (
						<p className="text-destructive">
							{actionData.errors.description}
						</p>
					)}
				</div>
				<div>
					<Label>Info</Label>
					<Textarea
						className="h-64"
						name="info"
						defaultValue={data.info}
					/>
					{actionData?.errors?.info && (
						<p className="text-destructive">
							{actionData.errors.info}
						</p>
					)}
				</div>
			</div>
			<div className="flex w-full justify-between">
				<input type="hidden" name="id" value={data.id} />
				{actionData?.errors?.id && (
					<p className="text-destructive">{actionData.errors.id}</p>
				)}
				<Button type="button" variant="destructive">
					Delete
				</Button>
				<Button type="submit">Save</Button>
			</div>
		</Form>
	);
}

export const handleProjectFormSubmit = async (request: Request) => {
	const formData = await request.formData();
	const id = Number(formData.get("id"));
	const year = Number(formData.get("year"));
	const month = Number(formData.get("month"));
	const company = String(formData.get("company"));
	const client = String(formData.get("client"));
	const title = String(formData.get("title"));
	const description = String(formData.get("description"));
	const info = String(formData.get("info"));
	const href = String(formData.get("href"));
	const tags = String(formData.get("tags"));
	const showcase = Boolean(formData.get("showcase"));
	const favorite = Boolean(formData.get("favorite"));
	const images = String(formData.get("images"));

	const errors: Record<string, string> = {};

	if (!id) errors.id = "ID is required.";
	if (!year) errors.year = "Year is required.";
	if (!month) errors.month = "Month is required.";
	if (month < 1 || month > 12) errors.month = "Month is invalid.";
	if (!company) errors.company = "Company is required.";
	if (!title) errors.title = "Title is required.";
	if (!description) errors.description = "Description is required.";
	if (!info) errors.info = "Info is required.";

	if (Object.keys(errors).length > 0) {
		return json({ errors });
	}

	try {
		await updateProject({
			id,
			year,
			month,
			company,
			client,
			title,
			description: description,
			info: info,
			href,
			tags: tags.split(",").map(tag => tag.trim()),
			showcase,
			favorite,
			images: images.split(",").map(image => image.trim()),
		});
		return true;
	} catch (error: any) {
		return json({ error: "Failed to send message." }, { status: 400 });
	}
};
