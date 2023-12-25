import { json } from "@remix-run/node";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateExperience } from "@/models/experience.server";
import { Label } from "@/components/ui/label";

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
			tags: tags.split(","),
			extraTags: extraTags.split(","),
		});
		return json({ success: "Updated successfully!" });
	} catch (error: any) {
		return json({ error: "Failed to send message." }, { status: 400 });
	}
};

export default function ExperienceForm({ data }: { data?: Experience }) {
	return (
		<form>
			<div className="grid gap-2 pb-4 sm:gap-4">
				<div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-4">
					<div className="col-span-3">
						<Label>Title</Label>
						<Input name="title" />
					</div>
					<div className="col-span-3">
						<Label>Company</Label>
						<Input name="company" />
					</div>
				</div>
				<div className="col-span-3">
					<Label>Period</Label>
					<Input name="period" />
				</div>
				<div className="col-span-3">
					<Label>Summary</Label>
					<Textarea className="h-24" name="summary" />
				</div>
				<div className="col-span-3">
					<Label>Description</Label>
					<Textarea className="h-64" name="description" />
				</div>
				<div className="col-span-3">
					<Label>Tags</Label>
					<Input name="tags" />
				</div>
				<div className="col-span-3">
					<Label>Extra Tags</Label>
					<Input name="extraTags" />
				</div>
			</div>
			<Button type="submit">
				Save {data ? "Changes" : "Experience"}
			</Button>
		</form>
	);
}
