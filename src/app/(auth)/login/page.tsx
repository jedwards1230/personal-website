"use client";

import { useFormState } from "react-dom";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createAdminSession } from "@/lib/session.server";

export default function Page() {
	const router = useRouter();
	const pathname = usePathname();

	async function loginAction(
		p: any,
		formData: FormData
	): Promise<FormResponse> {
		const password = String(formData.get("password"));

		try {
			await createAdminSession(password, "/admin");
		} catch (error) {
			return { error: String(error) };
		}

		router.push(pathname);
		return { success: "Login successful" };
	}

	const [state, formAction] = useFormState(loginAction, {});

	return (
		<form
			className="flex flex-col items-center justify-center gap-4"
			action={formAction}
		>
			<div>
				<p>Please sign in</p>
			</div>
			<div className="flex items-end gap-2">
				<Label>
					Password: <Input type="password" name="password" />
				</Label>
				<Button variant="outline" type="submit">
					Sign In
				</Button>
			</div>
			{state?.error && <div className="error">{state.error}</div>}
		</form>
	);
}
