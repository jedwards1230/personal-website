import { type LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import { requireAdminSession } from "@/session.server";
import Header from "./Header";
import SideBar from "./Sidebar";

export const loader: LoaderFunction = async ({ request }) => {
	await requireAdminSession(request);
	return {};
};

export default function Admin() {
	return (
		<div className="mx-auto h-full flex flex-col gap-4 p-4">
			<div className="flex flex-col gap-2 border border-border rounded-md h-full p-2">
				<Header />

				{/* Body */}
				<div className="rounded-sm overflow-hidden flex border border-border h-full w-full">
					<div className="w-full transition-all py-2 sm:w-1/3 md:w-1/4 lg:w-1/5 gap-2 flex flex-col border-r border-border">
						<SideBar />
					</div>
					<div className="w-full overflow-y-scroll h-full p-4">
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
}
