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
				"w-full block transition-all duration-100 py-2 cursor-pointer capitalize pl-4",
				className
			)}
		>
			{children}
		</Link>
	);
}
