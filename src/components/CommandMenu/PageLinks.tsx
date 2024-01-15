"use client";

import { Link2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { CommandItem } from "../ui/command";

export default function PageLinks({
	isAuthenticated,
}: {
	isAuthenticated: boolean;
}) {
	const router = useRouter();

	let links = [
		{
			name: "Home",
			url: "/",
		},
		{
			name: "CV",
			url: "/cv",
		},
		{
			name: "Admin",
			url: "/admin",
			secure: true,
		},
	];

	// Filter the links if the user is not authenticated
	if (!isAuthenticated) {
		links = links.filter(link => !link.secure);
	}

	return links.map(({ name, url, secure }) => (
		<CommandItem onSelect={() => router.push(url)} key={name}>
			<Link2 className="mr-2 h-4 w-4" />
			<span>{name}</span>
		</CommandItem>
	));
}
