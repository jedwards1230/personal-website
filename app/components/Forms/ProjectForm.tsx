import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { updateProject } from "@/models/project.server";
import { json } from "@remix-run/node";
import { Label } from "@/components/ui/label";

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
	if (!client) errors.client = "Client is required.";
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
			tags: tags.split(","),
			showcase,
			favorite,
			images: images.split(","),
		});
		return json({ success: "Updated successfully!" });
	} catch (error: any) {
		return json({ error: "Failed to send message." }, { status: 400 });
	}
};

export default function ProjectForm({ data }: { data: Project }) {
	return (
		<form>
			<div className="grid gap-2 pb-4 sm:gap-4">
				<div>
					<Label>Title</Label>
					<Input name="title" defaultValue={data.title} />
				</div>
				<div>
					<Label>Company</Label>
					<Input name="company" defaultValue={data.company} />
				</div>
				<div>
					<Label>Client</Label>
					<Input name="client" defaultValue={data.client ?? ""} />
				</div>
				<div>
					<Label>Link</Label>
					<Input name="href" defaultValue={data.href ?? ""} />
				</div>
				<div>
					<Label>Year</Label>
					<Input name="year" defaultValue={data.year} />
				</div>
				<div>
					<Label>Month</Label>
					<Input name="month" defaultValue={data.month} />
				</div>
				<div>
					<Label>Tags</Label>
					<Input name="tags" defaultValue={data.tags.join(",")} />
				</div>
				<div>
					<Label>Images</Label>
					<Input name="images" defaultValue={data.images.join(",")} />
				</div>
				<div>
					<Label>Showcase</Label>
					<Checkbox
						name="showcase"
						defaultChecked={data.showcase ?? false}
					/>
				</div>
				<div>
					<Label>Favorite</Label>
					<Checkbox
						name="favorite"
						defaultChecked={data.favorite ?? false}
					/>
				</div>
				<div>
					<Label>Description</Label>
					<Textarea
						className="h-64"
						name="description"
						defaultValue={data.description}
					/>
				</div>
				<div>
					<Label>Info</Label>
					<Textarea
						className="h-64"
						name="info"
						defaultValue={data.info}
					/>
				</div>
			</div>
			<input type="hidden" name="id" defaultValue={data.id} />
			<Button type="submit">
				Save {data ? "Changes" : "Experience"}
			</Button>
		</form>
	);
}
