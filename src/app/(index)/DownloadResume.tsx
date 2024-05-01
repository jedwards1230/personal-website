"use client";

import { Button } from "@/components/ui/button";
import { ExternalLinkIcon } from "lucide-react";
import { usePlausible } from "next-plausible";
import Link from "next/link";

export default function DownloadResume() {
	const plausible = usePlausible();

	return (
		<Button asChild className="!px-0" variant="link">
			<Link
				href="/resume"
				onClick={() => plausible("Resume Download")}
				className="group inline-flex select-none gap-4 hover:underline"
			>
				Download
				<span className="pt-0.5 transition-all duration-150 group-hover:sm:translate-x-1">
					<ExternalLinkIcon size={20} />
				</span>
			</Link>
		</Button>
	);
}
