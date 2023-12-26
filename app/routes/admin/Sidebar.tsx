import { NavLink } from "@remix-run/react";
import clsx from "clsx";

export default function SideBar() {
	return (
		<>
			<ListItem to={"/admin/about"}>About</ListItem>
			<ListItem to={"/admin/experience"}>Experience</ListItem>
			<ListItem to={"/admin/projects"}>Projects</ListItem>
			<div className="h-px bg-border my-2 mx-4"></div>
			<ListItem to="/admin/chat">Chat</ListItem>
			<div className="h-px bg-border my-2 mx-4"></div>
			<ListItem to="/admin/messages">Messages</ListItem>
		</>
	);
}

function ListItem({
	children,
	to,
	className,
}: {
	children: React.ReactNode;
	to: string;
	className?: string;
}) {
	return (
		<NavLink
			to={to}
			title={to}
			className={({ isActive, isPending }) =>
				clsx(
					isPending || isActive
						? "bg-foreground text-background hover:bg-foreground/70"
						: "focus:bg-foreground/30",
					"w-full block transition-all duration-100 py-2 hover:bg-secondary cursor-pointer capitalize pl-4",
					className
				)
			}
		>
			{children}
		</NavLink>
	);
}
