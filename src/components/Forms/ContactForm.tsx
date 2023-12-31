"use client";

import { useFormState } from "react-dom";

import { createContact } from "@/models/contact.server";
import Submit from "../buttons/SubmitButton";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export default function ContactForm() {
	async function submitMessage(p: any, formData: FormData) {
		try {
			await createContact(
				String(formData.get("name")),
				String(formData.get("email")),
				String(formData.get("message"))
			);
			return { success: "Message sent successfully!" };
		} catch (e) {
			return { error: String(e) };
		}
	}

	// @ts-ignore
	const [state, formAction] = useFormState(submitMessage, {});

	return (
		<form
			action={formAction}
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
					<Textarea
						required
						name="message"
						className="md:w-2/3"
						rows={5}
					/>
				</div>
				<Submit />
				<div className="pt-2 text-center">
					{state?.success && (
						<p className="text-green-500">{state.success}</p>
					)}
					{state?.error && (
						<p className="text-red-500">{state.error}</p>
					)}
				</div>
			</div>
		</form>
	);
}
