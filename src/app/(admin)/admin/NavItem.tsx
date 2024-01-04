"use client";

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
	const checkActive = eq ? pathname === to : pathname.includes(to);

	return (
		<Link
			href={to}
			title={to}
			className={clsx(
				checkActive
					? "bg-foreground text-background hover:bg-foreground/70"
					: "hover:bg-secondary focus:bg-foreground/30",
				"block w-full cursor-pointer py-2 pl-4 capitalize transition-all duration-100",
				className
			)}
		>
			{children}
		</Link>
	);
}
