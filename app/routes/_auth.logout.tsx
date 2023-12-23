import { type ActionFunctionArgs } from "@remix-run/node";
import { logoutAdminSession } from "../session.server";
import { Form, Link } from "@remix-run/react";
import { Button } from "@/components/ui/button";

export const action = async ({ request }: ActionFunctionArgs) => {
	return await logoutAdminSession(request);
};

export default function LogoutRoute() {
	return (
		<>
			<p>Are you sure you want to log out?</p>
			<div className="flex">
				<Form method="post">
					<Button variant="link">Logout</Button>
				</Form>
				<Button asChild variant="link">
					<Link to="/">Never mind</Link>
				</Button>
			</div>
		</>
	);
}
