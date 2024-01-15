import clsx from "clsx";

import { Badge } from "./ui/badge";

export default function TagList({
	tags,
	className,
	size = "default",
	onClick,
}: {
	tags: string[];
	className?: string;
	size?: "sm" | "default";
	onClick?: (tag: string) => void;
}) {
	return (
		<div className={clsx("flex flex-wrap gap-2 text-xs", className)}>
			{tags.map((t, i) =>
				onClick ? (
					<Badge
						size={size}
						key={"tag-" + i}
						variant="outline"
						onClick={e => {
							e.stopPropagation();
							onClick(t);
						}}
					>
						{t}
					</Badge>
				) : (
					<Badge key={"tag-" + i}>{t}</Badge>
				)
			)}
		</div>
	);
}
