"use client";

import { usePathname } from "next/navigation";
import { Edit, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AddButton({
	isEdit,
	newItem = false,
}: {
	isEdit: boolean;
	newItem?: boolean;
}) {
	const pathname = usePathname();

	return (
		<Button
			asChild
			size="icon"
			variant={isEdit ? "destructive" : "outline"}
		>
			<Link
				href={
					isEdit
						? pathname
						: `${pathname}?edit=${newItem ? "new" : "true"}`
				}
			>
				{newItem ? <Plus /> : <Edit />}
			</Link>
		</Button>
	);
}
