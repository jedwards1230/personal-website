"use client";

import { useState, useEffect } from "react";

export default function DarkModeHandler({
	children,
}: {
	children: JSX.Element;
}) {
	useDarkMode();
	return children;
}

export function useDarkMode() {
	useEffect(() => {
		const darkModeMediaQuery = window.matchMedia(
			"(prefers-color-scheme: dark)"
		);

		const setDarkModeClass = (e: MediaQueryListEvent | MediaQueryList) => {
			if ("matches" in e && e.matches) {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
		};

		setDarkModeClass(darkModeMediaQuery);
		darkModeMediaQuery.addEventListener("change", setDarkModeClass);

		return () => {
			darkModeMediaQuery.removeEventListener("change", setDarkModeClass);
		};
	}, []);
}

export function useIsDarkMode() {
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		const darkModeMediaQuery = window.matchMedia(
			"(prefers-color-scheme: dark)"
		);

		const setDarkModeClass = (e: MediaQueryListEvent | MediaQueryList) => {
			setIsDarkMode(e.matches);
		};

		setDarkModeClass(darkModeMediaQuery);
		darkModeMediaQuery.addEventListener("change", setDarkModeClass);

		return () => {
			darkModeMediaQuery.removeEventListener("change", setDarkModeClass);
		};
	}, []);

	return isDarkMode;
}
