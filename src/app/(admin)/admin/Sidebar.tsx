import NavItem from "./NavItem";

export default function SideBar() {
	return (
		<>
			<NavItem to={"/admin/about"}>About</NavItem>
			<NavItem to={"/admin/experience"}>Experience</NavItem>
			<NavItem to={"/admin/projects"}>Projects</NavItem>
			<div className="h-px bg-border my-2 mx-4"></div>
			<NavItem to="/admin/chat">Chat</NavItem>
			<div className="h-px bg-border my-2 mx-4"></div>
			<NavItem to="/admin/messages">Messages</NavItem>
		</>
	);
}
