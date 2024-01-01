"use client";

import { ExternalLinkIcon } from "lucide-react";
import { usePlausible } from "next-plausible";
import Link from "next/link";

export default function DownloadResume() {
	const plausible = usePlausible();

	return (
		<Link
			href="/resume"
			onClick={() => plausible("Resume Download")}
			target="_blank"
			className="group inline-flex select-none gap-4 hover:underline"
		>
			Download Resume
			<span className="pt-0.5 transition-all duration-150 group-hover:sm:translate-x-1">
				<ExternalLinkIcon />
			</span>
		</Link>
	);
}
