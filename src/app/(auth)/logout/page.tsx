"use client";

import { logoutAdminSession } from "@/app/session.server";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
	return (
		<>
			<p>Are you sure you want to log out?</p>
			<div className="flex">
				<Button onClick={logoutAdminSession} variant="link">
					Logout
				</Button>
				<Button asChild variant="link">
					<Link href="/">Never mind</Link>
				</Button>
			</div>
		</>
	);
}
