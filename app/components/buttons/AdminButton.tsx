import { Link } from "@remix-run/react";
import { User } from "lucide-react";

import { Button } from "../ui/button";


export const AdminButton = ({isAuthenticated}: {
	isAuthenticated: boolean;
}) => {
	if (!isAuthenticated) {
		return null; 
	}

	return (
		<Button variant="outline" asChild size="icon">
			<Link to="/admin">
				<User />
			</Link>
		</Button>
	);
};
