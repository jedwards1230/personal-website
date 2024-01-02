import Header from "./Header";
import NavItem from "./NavItem";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="mx-auto h-full flex flex-col gap-4 p-4">
			<div className="flex flex-col gap-2 border border-border rounded-md h-full p-2">
				<Header />

				<div className="rounded-sm grid grid-cols-12 overflow-hidden border border-border h-full w-full">
					<div className="hidden lg:flex w-full col-span-2 flex-col justify-between gap-2">
						<div className="w-full transition-all flex flex-col border-r border-border">
							<NavItem to={"/admin/about"}>About</NavItem>
							<NavItem to={"/admin/experience"}>
								Experience
							</NavItem>
							<NavItem to={"/admin/projects"}>Projects</NavItem>
							<NavItem to={"/admin/resume"}>Resume</NavItem>
							<div className="h-px bg-border my-2 mx-4"></div>
							<NavItem to="/admin/chat">Chat</NavItem>
							<div className="h-px bg-border my-2 mx-4"></div>
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
