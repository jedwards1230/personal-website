import { Home } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
	return (
		<div className="flex items-center justify-between px-2">
			<h2 className="text-xl font-semibold">Admin</h2>
			<div className="flex items-center gap-2 sm:gap-4">
				<Button asChild variant="outline" size="icon">
					<Link href="/">
						<Home />
					</Link>
				</Button>
				{/* <LogoutButton variant="outline">
				Log Out
			</LogoutButton> */}
			</div>
		</div>
	);
}
