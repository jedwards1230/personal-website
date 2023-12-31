"use client";

import Link from "next/link";

import { logoutAdminSession } from "@/app/session.server";
import { Button } from "@/components/ui/button";

export default function Page() {
	return (
		<>
			<p>Are you sure you want to log out?</p>
			<div className="flex">
				<Button
					onClick={async () => await logoutAdminSession()}
					variant="link"
				>
					Logout
				</Button>
				<Button asChild variant="link">
					<Link href="/">Never mind</Link>
				</Button>
			</div>
		</>
	);
}
