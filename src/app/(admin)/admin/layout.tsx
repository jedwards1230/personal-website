import Header from "./Header";
import SideBar from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="mx-auto h-full flex flex-col gap-4 p-4">
			<div className="flex flex-col gap-2 border border-border rounded-md h-full p-2">
				<Header />

				<div className="rounded-sm grid grid-cols-12 overflow-hidden border border-border h-full w-full">
					<div className="w-full transition-all hidden lg:flex col-span-2 flex-col border-r border-border">
						<SideBar />
					</div>
					{children}
				</div>
			</div>
		</div>
	);
}
