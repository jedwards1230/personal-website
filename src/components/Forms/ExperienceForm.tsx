"use client";

import { useFormState } from "react-dom";
import { redirect, usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Submit from "../buttons/SubmitButton";
import { updateExperience } from "@/models/experience.server";

export default function ExperienceForm({ data }: { data: Experience }) {
	const pathname = usePathname();

	async function handleExperienceFormSubmit(p: any, formData: FormData) {
		const id = Number(formData.get("id"));
		if (!id) return { error: "Invalid id." };

		try {
			await updateExperience({
				id,
				title: String(formData.get("title")),
				company: String(formData.get("company")),
				period: String(formData.get("period")),
				summary: String(formData.get("summary")),
				description: String(formData.get("description")).split("\n"),
				tags: String(formData.get("tags"))
					.split(",")
					.map(tag => tag.trim()),
				extraTags: String(formData.get("extraTags"))
					.split(",")
					.map(tag => tag.trim()),
			});
		} catch (error: any) {
			return { error: "Failed to send message." };
		}

		redirect(pathname);
	}

	// @ts-ignore
	const [state, formAction] = useFormState(handleExperienceFormSubmit, {});

	return (
		<form action={formAction}>
			<div className="grid gap-2 pb-4 sm:gap-4">
				<div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-4">
					<div className="col-span-3">
						<Label>Title</Label>
						<Input
							required
							name="title"
							defaultValue={data.title}
						/>
					</div>
					<div className="col-span-3">
						<Label>Company</Label>
						<Input
							required
							name="company"
							defaultValue={data.company}
						/>
					</div>
				</div>
				<div className="col-span-3">
					<Label>Period</Label>
					<Input required name="period" defaultValue={data.period} />
				</div>
				<div className="col-span-3">
					<Label>Summary</Label>
					<Textarea
						required
						className="h-24"
						name="summary"
						defaultValue={data.summary}
					/>
				</div>
				<div className="col-span-3">
					<Label>Description</Label>
					<Textarea
						required
						className="h-64"
						name="description"
						defaultValue={data.description.join("\n")}
					/>
				</div>
				<div className="col-span-3">
					<Label>Tags</Label>
					<Input
						required
						name="tags"
						defaultValue={data.tags.join(", ")}
					/>
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
				<Submit />
			</div>
			<div className="pt-2 text-center">
				{state?.error && <p className="text-red-500">{state.error}</p>}
			</div>
		</form>
	);
}