"use client";

import { useFormState } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import loginAction from "./action.server";

export default function Page() {
	// @ts-ignore
	const [state, formAction] = useFormState(loginAction, {});

	return (
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
			{state?.error && <div className="error">{state.error}</div>}
		</form>
	);
}
