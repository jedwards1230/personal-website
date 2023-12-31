"use client";

import { usePathname } from "next/navigation";
import { Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EditButton({ isEdit }: { isEdit: boolean }) {
	const pathname = usePathname();

	return (
		<Button
			asChild
			size="icon"
			variant={isEdit ? "destructive" : "outline"}
		>
			<Link href={isEdit ? pathname : `${pathname}?edit=true`}>
				<Edit />
			</Link>
		</Button>
	);
}
