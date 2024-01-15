"use client";

import { CommandItem } from "../ui/command";
import { logoutAdminSession } from "@/lib/session.server";
import { revalidateAction } from "@/lib/action.server";
import { useDialog } from "./DialogWrapper";
import { LogOut, Printer, RefreshCw } from "lucide-react";

export default function Actions({
	isAuthenticated,
}: {
	isAuthenticated: boolean;
}) {
	const { closeDialog } = useDialog();

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

	return actions.map(({ name, exec, Icon }) => (
		<CommandItem onSelect={exec} key={name}>
			<Icon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
			{name}
		</CommandItem>
	));
}
