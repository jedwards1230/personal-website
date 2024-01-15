"use client";

import { Button } from "@/components/ui/button";
import { AtSign, Github, LinkedinIcon } from "lucide-react";

export default function IconLinks({ about }: { about: About }) {
	const linkedInUsername = about.linkedin.replace(/\/$/, "").split("/").pop();
	const githubUsername = about.github.replace(/\/$/, "").split("/").pop();

	const size = {
		width: 28,
		height: 28,
	};

	const links = [
		{
			title: "@" + githubUsername,
			href: about.github,
			icon: <Github {...size} />,
		},
		{
			title: "@" + linkedInUsername,
			href: about.linkedin,
			icon: <LinkedinIcon {...size} />,
		},
		{
			title: about.email,
			href: "mailto:" + about.email + "?subject=Hello!",
			icon: <AtSign {...size} />,
		},
	];

	return (
		<div className="flex gap-4 text-xs">
			{links.map((link, i) => (
				<Button key={i} asChild size="icon" variant="outline">
					<a
						title={link.title}
						className="fill-neutral-600 transition-colors hover:fill-neutral-950 dark:fill-neutral-400 dark:hover:fill-neutral-50"
						href={link.href}
						target="_blank"
						rel="noreferrer"
					>
						{link.icon}
					</a>
				</Button>
			))}
		</div>
	);
}
