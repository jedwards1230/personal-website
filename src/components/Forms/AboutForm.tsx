"use client";

import { useFormState } from "react-dom";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { handleAboutFormSubmit } from "./actions.server";
import Submit from "@/components/buttons/SubmitButton";

export default function AboutForm({ data }: { data: About }) {
	// @ts-ignore
	const [state, formAction] = useFormState(handleAboutFormSubmit, {});

	return (
		<form action={formAction} className="space-y-2 sm:space-y-4">
			<div className="grid w-full grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-4">
				<div className="col-span-3">
					<Label>Name</Label>
					<Input required defaultValue={data.name} name="name" />
				</div>
				<div className="col-span-3">
					<Label>Title</Label>
					<Input required defaultValue={data.title} name="title" />
				</div>
			</div>
			<div className="col-span-3">
				<Label>Location</Label>
				<Input required defaultValue={data.location} name="location" />
			</div>
			<div className="grid w-full grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-4">
				<div className="col-span-3">
					<Label>Email</Label>
					<Input
						defaultValue={data.email}
						required
						type="email"
						name="email"
					/>
				</div>
				<div className="col-span-3">
					<Label>Phone</Label>
					<Input
						required
						defaultValue={data.phone}
						type="tel"
						name="phone"
					/>
				</div>
			</div>
			<div className="grid w-full grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-4">
				<div className="col-span-3">
					<Label>LinkedIn</Label>
					<Input
						required
						defaultValue={data.linkedin}
						name="linkedin"
					/>
				</div>
				<div className="col-span-3">
					<Label>GitHub</Label>
					<Input required defaultValue={data.github} name="github" />
				</div>
			</div>
			<div className="col-span-3">
				<Label>Tags</Label>
				<Input required defaultValue={data.tags} name="tags" />
			</div>
			<div className="col-span-3">
				<Label>Bio</Label>
				<Textarea
					required
					defaultValue={data.description}
					className="h-64"
					name="description"
				/>
			</div>
			<input type="hidden" name="id" value={data.id} />
			<Submit />
			<div className="pt-2 text-center">
				{state?.error && <p className="text-red-500">{state.error}</p>}
			</div>
		</form>
	);
}
