"use client";

import { useFormState } from "react-dom";

import { createContact } from "@/models/contact.server";
import Submit from "../buttons/SubmitButton";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

async function submitMessage(
	p: any,
	formData: FormData
): Promise<FormResponse> {
	try {
		await createContact({
			name: String(formData.get("name")),
			email: String(formData.get("email")),
			message: String(formData.get("message")),
			id: Date.now(),
			createdAt: new Date(),
			readAt: null,
		});
		return { success: "Message sent successfully!" };
	} catch (e) {
		return { error: String(e) };
	}
}

export default function ContactForm() {
	const [state, formAction] = useFormState(submitMessage, {});

	return (
		<form
			action={formAction}
			className="flex h-full w-full max-w-[50%] flex-1 flex-col justify-between"
		>
			<div className="flex w-full select-none flex-col gap-4">
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
				<Submit>Send</Submit>
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
