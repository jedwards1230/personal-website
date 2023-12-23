import {
	type ActionFunction,
	json,
	type LoaderFunction,
} from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Edit, Home } from "lucide-react";
import { forwardRef } from "react";

import { getAllExperiences } from "@/models/experience.server";
import { getAllProjects } from "@/models/project.server";
import { getAllMessages } from "@/models/contact.server";
import { getAbout } from "@/models/about.server";
import AboutDialog, {
	handleAboutFormSubmit,
} from "@/components/dialogs/admin/dialog/AboutDialog";
import { ExperienceDialog } from "@/components/dialogs/admin/dialog/ExperienceDialog";
import { ProjectDialog } from "@/components/dialogs/admin/dialog/ProjectDialog";
import MessageDialog from "@/components/dialogs/admin/dialog/MessageDialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { requireAdminSession } from "@/session.server";
import { handleExperienceFormSubmit } from "@/components/dialogs/admin/forms/ExperienceForm";

export const loader: LoaderFunction = async ({ request }) => {
	try {
		await requireAdminSession(request);

		const [experiences, projects, messages, about] = await Promise.all([
			getAllExperiences("company"),
			getAllProjects("title"),
			getAllMessages(),
			getAbout(),
		]);
		return json({
			experiences,
			projects,
			messages,
			about,
		});
	} catch (error) {
		return error;
	}
};

const SECTIONS = {
	ABOUT: "About",
	EXPERIENCE: "Experience",
	PROJECTS: "Projects",
	MESSAGES: "Messages",
};

export default function Admin() {
	const { experiences, projects, messages, about } = useLoaderData<
		typeof loader
	>() as {
		experiences: Experience[];
		projects: Project[];
		messages: Contact[];
		about: About;
	};

	const linkedInUsername = about.linkedin.replace(/\/$/, "").split("/").pop();
	const githubUsername = about.github.replace(/\/$/, "").split("/").pop();

	return (
		<div className="mx-auto flex max-w-5xl flex-col gap-4 p-4">
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-semibold">Admin</h2>
				<div className="flex items-center gap-2 sm:gap-4">
					<Button asChild variant="outline" size="icon">
						<Link to="/">
							<Home />
						</Link>
					</Button>
					{/* <LogoutButton variant="outline">
					Log Out
				</LogoutButton> */}
				</div>
			</div>
			<Section
				addButtonDialog={
					<AboutDialog about={about}>
						<Button
							type="button"
							className="text-xl font-medium"
							variant="outline"
							size="icon"
						>
							<Edit />
						</Button>
					</AboutDialog>
				}
				title={SECTIONS.ABOUT}
			>
				{about && (
					<div className="space-y-2 px-2">
						<div className="flex">
							<div className="w-1/2">
								<Label>Name</Label>
								<div>{about.name}</div>
							</div>
							<div className="w-1/2">
								<Label>Title</Label>
								<div>{about.title}</div>
							</div>
						</div>
						<div>
							<Label>Location</Label>
							<div>{about.location}</div>
						</div>
						<div className="flex">
							<div className="w-1/2">
								<Label>Email</Label>
								<div>{about.email}</div>
							</div>
							<div className="w-1/2">
								<Label>Phone</Label>
								<div>{about.phone}</div>
							</div>
						</div>
						<div className="flex">
							<div className="w-1/2">
								<Label>Github</Label>
								<div>
									<a
										className="hover:underline"
										href={about.github}
										target="_blank"
									>
										{githubUsername}
									</a>
								</div>
							</div>
							<div className="w-1/2">
								<Label>LinkedIn</Label>
								<div>
									<a
										className="hover:underline"
										href={about.linkedin}
										target="_blank"
									>
										{linkedInUsername}
									</a>
								</div>
							</div>
						</div>
						<div>
							<Label>Tags</Label>
							<div>{about.tags.join(", ")}</div>
						</div>
					</div>
				)}
			</Section>
			<div className="flex flex-col justify-between gap-4 sm:flex-row">
				<Section
					title={SECTIONS.EXPERIENCE}
					addButtonDialog={
						<ExperienceDialog>
							<Button
								type="button"
								className="text-xl font-medium"
								variant="outline"
								size="icon"
							>
								+
							</Button>
						</ExperienceDialog>
					}
				>
					{experiences.map((e, i) => (
						<ExperienceDialog
							experience={e}
							key={"experience-" + i}
						>
							<ListItem>{e.company}</ListItem>
						</ExperienceDialog>
					))}
				</Section>
				<Section
					title={SECTIONS.PROJECTS}
					addButtonDialog={
						<ProjectDialog>
							<Button
								type="button"
								className="text-xl font-medium"
								variant="outline"
								size="icon"
							>
								+
							</Button>
						</ProjectDialog>
					}
				>
					{projects.map((p, i) => (
						<ProjectDialog project={p} key={"project-" + i}>
							<ListItem>{p.title}</ListItem>
						</ProjectDialog>
					))}
				</Section>
			</div>
			<Section title={SECTIONS.MESSAGES}>
				{messages.length > 0 ? (
					<>
						<div className="grid grid-cols-6 pb-1 text-secondary-foreground sm:grid-cols-8 md:grid-cols-12">
							<span className="col-span-2 underline">Date</span>
							<span className="col-span-2 hidden underline sm:block">
								Name
							</span>
							<span className="col-span-4 underline">Email</span>
							<span className="col-span-4 hidden underline md:block">
								Message
							</span>
						</div>
						{messages.map((m, i) => (
							<MessageDialog key={"message-" + i} message={m}>
								<ListItem>
									<div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12">
										<span className="col-span-2">
											{new Date(
												m.createdAt
											).toLocaleDateString()}
											<span className="font-bold text-primary-foreground">
												{m.readAt ? "" : "  •"}
											</span>
										</span>
										<span className="col-span-2 hidden sm:block">
											{m.name}
										</span>
										<span className="col-span-4">
											{m.email}
										</span>
										<span className="col-span-4 hidden truncate md:block">
											{m.message}
										</span>
									</div>
								</ListItem>
							</MessageDialog>
						))}
					</>
				) : (
					<div className="px-2">No Messages</div>
				)}
			</Section>
		</div>
	);
}

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();
	switch (formData.get("action")) {
		case "about":
			return handleAboutFormSubmit(request);
		case "experience":
			return handleExperienceFormSubmit(request);
		case "project":
		//return handleProjectFormSubmit(request);
		case "message":
		//return handleMessageFormSubmit(request);
		default:
			return json({ error: "Invalid action" }, { status: 400 });
	}
};

export const Section = ({
	children,
	title,
	addButtonDialog,
}: {
	children: React.ReactNode;
	title: string;
	addButtonDialog?: React.ReactNode;
}) => (
	<div className="w-full rounded border border-border p-2 transition-all">
		<div className="flex w-full justify-between">
			<div className="p-2 text-lg font-bold">{title}</div>
			{addButtonDialog && (
				<div className="flex justify-end">{addButtonDialog}</div>
			)}
		</div>
		<div className="w-full flex flex-col text-left py-1">{children}</div>
	</div>
);

export const ListItem = ({ children }: { children: React.ReactNode }) => (
	<div className="w-full text-left cursor-pointer rounded-lg px-2 py-1 underline-offset-4 hover:bg-secondary/60 hover:underline">
		{children}
	</div>
);
