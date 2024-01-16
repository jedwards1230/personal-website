import clsx from "clsx";

import { Button } from "@/components/ui/button";

export default function Section({
	title,
	className,
	children,
}: {
	title: string;
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<div className={clsx("space-y-3 sm:space-y-4", className)}>
			<Button
				id={title.toLowerCase()}
				variant="link"
				className="pl-0 text-xl font-semibold"
			>
				<a href={`#${title.toLowerCase()}`}>{title}</a>
			</Button>
			{children}
		</div>
	);
}
