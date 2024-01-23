import { AtSignIcon, Github, Linkedin } from "lucide-react";

import {
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import DialogWrapper from "./DialogWrapper";
import { getAbout } from "@/models/about.server";
import { checkAuthenticated } from "@/lib/session.server";
import PageLinks from "./PageLinks";
import Actions from "./Actions";

export async function CommandMenu() {
	const isAuthenticated = await checkAuthenticated();

	return (
		<>
			<DialogWrapper>
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<PageLinks isAuthenticated={isAuthenticated} />
					<CommandSeparator />
					<Actions isAuthenticated={isAuthenticated} />
					<CommandSeparator />
					<SocialLinks />
				</CommandList>
			</DialogWrapper>
		</>
	);
}

async function SocialLinks() {
	const about = await getAbout();

	const socialLinks = [
		{
			name: "GitHub",
			url: about.github,
			Icon: Github,
		},
		{
			name: "LinkedIn",
			url: about.linkedin,
			Icon: Linkedin,
		},
		{
			name: "Email",
			url: about.email,
			Icon: AtSignIcon,
		},
	];

	if (socialLinks.length === 0) return null;
	return (
		<CommandGroup heading="Links">
			{socialLinks.map(({ name, url, Icon }) => (
				<CommandItem key={name}>
					<Icon className="mr-2 h-4 w-4" />
					<span>{name}</span>
				</CommandItem>
			))}
		</CommandGroup>
	);
}
