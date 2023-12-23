import { Outlet } from "@remix-run/react";

export default function AuthLayout() {
	return (
		<div className="w-full flex flex-col h-full gap-4 items-center justify-center">
			<Outlet />
		</div>
	);
}
