import { Link } from "@remix-run/react";
import { Home } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Header() {
	return (
		<div className="flex justify-between items-center px-2">
			<h2 className="text-xl font-semibold">Admin</h2>
			<div className="flex items-center gap-2 sm:gap-4">
				<Button asChild variant="outline" size="icon">
					<Link to="/">
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
