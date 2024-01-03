"use client";

import { Redo } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { revalidateAction } from "../../../../lib/action.server";

export default function RevalidateButton() {
	const [loading, setLoading] = useState(false);

	const onClick = async () => {
		setLoading(true);
		await revalidateAction();
		setLoading(false);
	};

	return (
		<Button onClick={onClick} disabled={loading} size="icon">
			<Redo />
		</Button>
	);
}
