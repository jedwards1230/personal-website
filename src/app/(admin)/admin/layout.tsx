import { type Metadata } from "next";
import { Home } from "lucide-react";
import Link from "next/link";

import NavItem from "./NavItem";
import { Button } from "@/components/ui/button";
import MenuButton from "./MenuButton";

export const metadata: Metadata = {
	title: "Admin",
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="mx-auto flex h-full flex-col gap-4 px-1 py-2 transition-all lg:p-2">
			<div className="flex h-full flex-col gap-2 rounded-md border-border p-2 lg:border">
				<div className="flex items-center justify-between px-2">
					<h2 className="text-xl font-semibold">Admin</h2>
					<div className="flex items-center gap-2">
						<Button asChild variant="outline" size="icon">
							<Link href="/">
								<Home />
							</Link>
						</Button>
						<MenuButton>
							<AdminNav />
						</MenuButton>
					</div>
				</div>

				<div className="grid h-full w-full grid-cols-12 overflow-hidden rounded-sm border border-border">
					<div className="hidden lg:col-span-2 lg:flex">
						<AdminNav />
					</div>
					{children}
				</div>
			</div>
		</div>
	);
}

function AdminNav() {
	return (
		<div className="flex h-full w-full flex-col justify-between gap-2 lg:border-r lg:border-border">
			<div className="flex w-full flex-col transition-all">
				<NavItem to={"/admin/about"}>About</NavItem>
				<NavItem to={"/admin/experience"}>Experience</NavItem>
				<NavItem to={"/admin/projects"}>Projects</NavItem>
				<div className="mx-4 my-2 h-px bg-border"></div>
				<NavItem to="/admin/chat">Chat</NavItem>
				<div className="mx-4 my-2 h-px bg-border"></div>
				<NavItem to="/admin/messages">Messages</NavItem>
			</div>
			<div className="transition-all">
				<NavItem to="/admin/data">Data</NavItem>
			</div>
		</div>
	);
}
