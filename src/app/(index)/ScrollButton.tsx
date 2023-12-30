"use client";

import { ChevronDown } from "lucide-react";
import { useEffect } from "react";

export default function ScrollButton() {
	useEffect(() => {
		const handleScroll = () => {
			const chevron = document.querySelector(".chevron") as HTMLElement;
			if (chevron) {
				const windowHeight = window.innerHeight;
				const scrollY = window.scrollY;
				const offset = -200;
				const opacity = 1 - scrollY / (windowHeight + offset);
				chevron.style.opacity = Math.max(opacity, 0).toString();
			}
		};

		// Attach the event listener
		window.addEventListener("scroll", handleScroll);

		// Remove the event listener on cleanup
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<button
			aria-label="Scroll down"
			onClick={() =>
				document
					.getElementById("projects")
					?.scrollIntoView({ behavior: "smooth" })
			}
			className="chevron absolute inset-x-auto bottom-12"
		>
			<ChevronDown className="transition-all hover:scale-150" />
		</button>
	);
}
