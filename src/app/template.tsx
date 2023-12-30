"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const router = useRouter();

	useEffect(() => {
		const toggleAdmin = (e: KeyboardEvent) => {
			if (e.metaKey && e.key === "0") {
				e.preventDefault();
				if (pathname.includes("/admin")) {
					router.push("/");
				} else {
					router.push("/admin");
				}
			}
		};

		document.addEventListener("keydown", toggleAdmin);
		return () => document.removeEventListener("keydown", toggleAdmin);
	}, []);

	return children;
}
