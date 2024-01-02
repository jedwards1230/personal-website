"use client";

import { useFormState } from "react-dom";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Submit from "../buttons/SubmitButton";
import {
	createEducation,
	getNewEducationId,
	updateEducation,
} from "@/models/education.server";

export default function EducationForm({ data }: { data?: Education }) {
	const router = useRouter();
	const pathname = usePathname();

	async function handleEducationFormSubmit(p: any, formData: FormData) {
		const id = data
			? Number(formData.get("id"))
			: await getNewEducationId();
		if (!id) return { error: "Invalid id." };

		try {
			const params = {
				id,
				school: String(formData.get("school")),
				degree: String(formData.get("degree")),
				endDate: new Date(
					Number(formData.get("endYear")),
					Number(formData.get("endMonth")) - 1
				),
			};
			data
				? await updateEducation(params)
				: await createEducation(params);
		} catch (error: any) {
			return { error: "Failed to send message." };
		}

		router.push(pathname);
	}

	// @ts-ignore
	const [state, formAction] = useFormState(handleEducationFormSubmit, {});

	return (
		<form
			className="flex border border-border rounded-rounded p-4 flex-col gap-2"
			action={formAction}
		>
			<div className="grid gap-2 pb-4 sm:gap-4">
				<div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-4">
					<div className="col-span-3">
						<Label>School</Label>
						<Input
							required
							name="school"
							defaultValue={data?.school}
						/>
					</div>
					<div className="col-span-3">
						<Label>Degree</Label>
						<Input
							required
							name="degree"
							defaultValue={data?.degree}
						/>
					</div>
				</div>
				<div className="col-span-3">
					<Label>Graduation Date</Label>
					<div className="flex gap-2">
						<Input
							required
							name="endMonth"
							type="month"
							defaultValue={
								data?.endDate
									? new Date(data.endDate).getMonth() + 1
									: undefined
							}
						/>
						<Input
							required
							name="endYear"
							type="year"
							defaultValue={
								data?.endDate
									? new Date(data.endDate).getFullYear()
									: undefined
							}
						/>
					</div>
				</div>
			</div>
			<div className="flex w-full justify-between">
				<input type="hidden" name="id" value={data?.id} />
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
