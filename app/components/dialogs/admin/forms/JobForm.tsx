import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { DialogFooter } from "@/components/ui/dialog";
import { invariant } from "@/utils";
import { createJob, updateJob } from "@/models/job.server";

const formSchema = z.object({
	title: z.string().min(1),
	company: z.string().min(1),
	pay: z.string(),
	description: z.string().min(1),
	href: z.string().url(),
});

export default function JobForm({
	data,
	setEdit,
}: {
	data?: Job;
	setEdit: (edit: boolean) => void;
}) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: data?.title || "",
			company: data?.company || "",
			pay: data?.pay || "",
			description: data?.description || "",
			href: data?.href || "",
		},
	});

	const handleSubmit = async (values: z.infer<typeof formSchema>) => {
		invariant(data?.id, "Missing job id");
		const updatedJob: Job = {
			...data,
			...values,
		};

		try {
			if (!data) {
				await createJob(updatedJob);
			} else {
				await updateJob(updatedJob);
			}
			setEdit(false);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Form {...form}>
			<form>
				<div className="flex flex-col gap-2 pb-4 sm:gap-4">
					<FormField
						control={form.control}
						name="company"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Company</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="pay"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Pay</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="href"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Link</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea className="h-24" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<DialogFooter>
					<Button
						onClick={form.handleSubmit(handleSubmit)}
						type="submit"
					>
						Save {data ? "Changes" : "Experience"}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
}
