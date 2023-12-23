import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node"; // or cloudflare/deno
import { json, redirect } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";

import { createAdminSession, isAuthenticated } from "../session.server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export async function loader({ request }: LoaderFunctionArgs) {
	const authenticated = await isAuthenticated(request);
	if (authenticated) {
		return redirect("/");
	}

	const data = { error: request.headers.get("error") };
	return json(data);
}

export async function action({ request }: ActionFunctionArgs) {
	const form = await request.formData();
	const password = form.get("password");

	try {
		return await createAdminSession(password?.toString() ?? "", "/");
	} catch (error) {
		// Redirect back to the login page with errors.
		return redirect("/login", {
			headers: {
				"Set-Cookie": `error=${encodeURIComponent(error as string)}`,
			},
		});
	}
}

export default function Login() {
	const { error } = useLoaderData<typeof loader>();

	return (
		<div>
			{error ? <div className="error">{error}</div> : null}
			<form
				className="flex flex-col justify-center items-center gap-4"
				method="POST"
			>
				<div>
					<p>Please sign in</p>
				</div>
				<div className="flex gap-2 items-end">
					<Label>
						Password: <Input type="password" name="password" />
					</Label>
					<Button variant="outline" type="submit">
						Sign In
					</Button>
				</div>
			</form>
		</div>
	);
}
