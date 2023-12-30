import { createAdminSession } from "@/app/session.server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { revalidatePath } from "next/cache";

export default function Page() {
	const error = {
		value: "Invalid password",
	};

	async function formAction(formData: FormData) {
		"use server";
		const password = formData.get("password");

		try {
			return await createAdminSession(password?.toString() ?? "", "/");
		} catch (error) {
			return revalidatePath("/");
		}
	}

	return (
		<div>
			<form
				className="flex flex-col justify-center items-center gap-4"
				action={formAction}
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
				{error ? <div className="error">{error?.value}</div> : null}
			</form>
		</div>
	);
}
