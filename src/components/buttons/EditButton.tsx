"use client";

import { usePathname } from "next/navigation";
import { Edit, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EditButton({
	isEdit,
	newItem = false,
	path,
}: {
	isEdit: boolean;
	newItem?: boolean;
	path?: string;
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
						: newItem
							? `${path ?? pathname}/new`
							: `${path ?? pathname}?edit=true`
				}
			>
				{newItem ? <Plus /> : <Edit />}
			</Link>
		</Button>
	);
}
