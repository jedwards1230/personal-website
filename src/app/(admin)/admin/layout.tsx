import { type Metadata } from "next";
import Header from "./Header";
import NavItem from "./NavItem";

export const metadata: Metadata = {
	title: "Admin",
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="mx-auto flex h-full flex-col gap-4 p-4">
			<div className="flex h-full flex-col gap-2 rounded-md border border-border p-2">
				<Header />

				<div className="grid h-full w-full grid-cols-12 overflow-hidden rounded-sm border border-border">
					<div className="hidden w-full flex-col justify-between gap-2 border-r border-border lg:col-span-2 lg:flex">
						<div className="flex w-full flex-col transition-all">
							<NavItem to={"/admin/about"}>About</NavItem>
							<NavItem to={"/admin/experience"}>
								Experience
							</NavItem>
							<NavItem to={"/admin/projects"}>Projects</NavItem>
							<NavItem to={"/admin/resume"}>Resume</NavItem>
							<div className="mx-4 my-2 h-px bg-border"></div>
							<NavItem to="/admin/chat">Chat</NavItem>
							<div className="mx-4 my-2 h-px bg-border"></div>
							<NavItem to="/admin/messages">Messages</NavItem>
						</div>
						<div className="transition-all">
							<NavItem to="/admin/data">Data</NavItem>
						</div>
					</div>
					{children}
				</div>
			</div>
		</div>
	);
}
