import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateJob } from "@/models/job.server";
import { Label } from "@/components/ui/label";

export const handleProjectFormSubmit = async (formData: FormData) => {
	const id = Number(formData.get("id"));
	const title = String(formData.get("title"));
	const company = String(formData.get("company"));
	const pay = String(formData.get("pay"));
	const description = String(formData.get("description"));
	const href = String(formData.get("href"));
	const createdAt = new Date(String(formData.get("createdAt")));

	const errors: Record<string, string> = {};

	if (!id) errors.id = "ID is required.";
	if (!company) errors.company = "Company is required.";
	if (!title) errors.title = "Title is required.";
	if (!description) errors.description = "Description is required.";

	if (Object.keys(errors).length > 0) {
		return { errors };
	}

	try {
		await updateJob({
			id,
			title,
			company,
			pay,
			description,
			href,
			createdAt,
		});
		return { success: "Updated successfully!" };
	} catch (error: any) {
		return { error: "Failed to send message." };
	}
};

export default function JobForm({ data }: { data: Job }) {
	return (
		<form>
			<div className="flex flex-col gap-2 pb-4 sm:gap-4">
				<div>
					<Label>Company</Label>
					<Input name="company" defaultValue={data.company} />
				</div>
				<div>
					<Label>Title</Label>
					<Input name="title" defaultValue={data.title} />
				</div>
				<div>
					<Label>Pay</Label>
					<Input name="pay" defaultValue={data.pay ?? ""} />
				</div>
				<div>
					<Label>Link</Label>
					<Input name="href" defaultValue={data.href ?? ""} />
				</div>
				<div>
					<Label>Description</Label>
					<Textarea
						className="h-24"
						name="description"
						defaultValue={data.description}
					/>
				</div>
			</div>
			<input type="hidden" name="id" value={data?.id} />
			<input
				type="hidden"
				name="createdAt"
				value={data?.createdAt.toDateString()}
			/>
			<Button type="submit">
				Save {data ? "Changes" : "Experience"}
			</Button>
		</form>
	);
}
