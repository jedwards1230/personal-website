"use client";

import { CommandGroup, CommandItem } from "../ui/command";
import { logoutAdminSession } from "@/lib/session.server";
import { revalidateAction } from "@/lib/action.server";
import { useDialog } from "./DialogWrapper";
import { LogOut, Printer, RefreshCw } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Actions({
	isAuthenticated,
}: {
	isAuthenticated: boolean;
}) {
	const { closeDialog } = useDialog();
	const pathname = usePathname();

	let actions = [
		{
			name: "Print",
			Icon: Printer,
			exec: () => {
				closeDialog();
				setTimeout(() => {
					window.print();
				}, 300);
			},
		},
		{
			name: "Revalidate",
			Icon: RefreshCw,
			exec: revalidateAction,
			secure: true,
		},
		{
			name: "Sign Out",
			Icon: LogOut,
			exec: logoutAdminSession,
			secure: true,
		},
	];

	// Filter the actions if the user is not authenticated
	if (!isAuthenticated) {
		actions = actions.filter(action => !action.secure);
	}

	actions = actions.filter(action => {
		// hide print on / page
		if (action.name === "Print" && pathname === "/") {
			return false;
		}
		return true;
	});

	if (actions.length === 0) return null;
	return (
		<CommandGroup heading="Actions">
			{actions.map(({ name, exec, Icon }) => (
				<CommandItem onSelect={exec} key={name}>
					<Icon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
					{name}
				</CommandItem>
			))}
		</CommandGroup>
	);
}
