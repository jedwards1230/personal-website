"use client";

import { useFormState } from "react-dom";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	createProject,
	getNewProjectId,
	updateProject,
} from "@/models/project.server";
import { Label } from "@/components/ui/label";
import { revalidateAction } from "@/lib/action.server";
import ImageHandler from "./ImageHandler";

export default function ProjectForm({ data }: { data?: Project | null }) {
	const router = useRouter();
	const pathname = usePathname();

	const handleProjectFormSubmit = async (
		p: any,
		formData: FormData
	): Promise<FormResponse> => {
		const id = data ? Number(formData.get("id")) : await getNewProjectId();
		if (!id) return { error: "Invalid id." };

		const date = new Date(
			Number(formData.get("year")),
			Number(formData.get("month")) - 1
		);

		try {
			const params = {
				id,
				date,
				company: String(formData.get("company")),
				client: String(formData.get("client")),
				title: String(formData.get("title")),
				description: String(formData.get("description")),
				info: String(formData.get("info")),
				href: String(formData.get("href")),
				tags: String(formData.get("tags"))
					.split(",")
					.map(tag => tag.trim()),
				images: String(formData.get("images"))
					.split(",")
					.map(image => image.trim()),
			};

			data ? await updateProject(params) : await createProject(params);
			revalidateAction();
		} catch (error: any) {
			return { error: "Failed to send message." };
		}

		router.push(pathname.split("/").slice(0, -1).join("/") + "/" + id);
		return { success: "Project updated successfully!" };
	};

	const [state, formAction] = useFormState(handleProjectFormSubmit, {});

	return (
		<form action={formAction}>
			<div className="grid gap-2 pb-4 sm:gap-4">
				<div>
					<Label>Title</Label>
					<Input required name="title" defaultValue={data?.title} />
				</div>
				<div className="flex justify-between gap-4">
					<div className="w-full">
						<Label>Company</Label>
						<Input
							required
							name="company"
							defaultValue={data?.company}
						/>
					</div>
					<div className="w-full">
						<Label>Client</Label>
						<Input
							name="client"
							defaultValue={data?.client ?? ""}
						/>
					</div>
				</div>
				<div>
					<Label>Link</Label>
					<Input name="href" defaultValue={data?.href ?? ""} />
				</div>
				<div className="flex justify-between gap-4">
					<div className="w-full">
						<Label>Month</Label>
						<Input
							required
							name="month"
							defaultValue={
								data?.date
									? data.date.getUTCMonth() + 1
									: undefined
							}
						/>
					</div>
					<div className="w-full">
						<Label>Year</Label>
						<Input
							required
							name="year"
							defaultValue={
								data?.date
									? data?.date.getUTCFullYear()
									: undefined
							}
						/>
					</div>
				</div>
				<div>
					<Label>Tags</Label>
					<Input
						required
						name="tags"
						defaultValue={data?.tags.join(", ")}
					/>
				</div>
				<ImageHandler imageData={data?.images ?? []} />
				<div>
					<Label>Description</Label>
					<Textarea
						required
						className="h-32"
						name="description"
						defaultValue={data?.description}
					/>
				</div>
				<div>
					<Label>Info</Label>
					<Textarea
						required
						className="h-64"
						name="info"
						defaultValue={data?.info}
					/>
				</div>
			</div>
			<div className="flex w-full justify-between">
				<input type="hidden" name="id" value={data?.id} />
				{state?.error && (
					<p className="text-destructive">{state.error}</p>
				)}
				<Button type="button" variant="destructive">
					Delete
				</Button>
				<Button type="submit">Save</Button>
			</div>
		</form>
	);
}
