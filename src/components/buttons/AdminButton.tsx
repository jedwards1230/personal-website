import { User } from "lucide-react";
import Link from "next/link";

import { Button } from "../ui/button";
import { isAuthenticated } from "@/app/session.server";

export const AdminButton = async () => {
	const authenticated = await isAuthenticated();

	if (!authenticated) return null;
	return (
		<Button variant="outline" asChild size="icon">
			<Link href="/admin">
				<User />
			</Link>
		</Button>
	);
};
