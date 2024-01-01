"use client";

import { useFormStatus } from "react-dom";

import { Button } from "../ui/button";

export default function Submit({
	children = "Save",
}: {
	children?: React.ReactNode;
}) {
	const status = useFormStatus();

	return (
		<Button disabled={status.pending} type="submit">
			{children}
		</Button>
	);
}
