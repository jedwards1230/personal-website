"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavItem({
	children,
	to,
	eq = false,
	className,
}: {
	children: React.ReactNode;
	to: string;
	eq?: boolean;
	className?: string;
}) {
	const pathname = usePathname();
	const isActive = eq ? pathname === to : pathname.includes(to);

	return (
		<Button
			autoFocus={isActive}
			asChild
			variant="link"
			className={clsx(
				"justify-start rounded-none",
				isActive
					? "bg-foreground text-background hover:bg-foreground/70"
					: "hover:bg-secondary focus:bg-foreground/30"
			)}
		>
			<Link
				href={to}
				title={to}
				className={clsx(
					"block w-full cursor-pointer py-2 pl-4 capitalize transition-all duration-100",
					className
				)}
			>
				{children}
			</Link>
		</Button>
	);
}
