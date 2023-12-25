import { type LinksFunction } from "@remix-run/node";
import {
	Link,
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
	useRouteError,
} from "@remix-run/react";
import { useEffect } from "react";

import styles from "./styles.css";
import { Button } from "./components/ui/button";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function App() {
	useEffect(() => {
		document.addEventListener("keydown", (e) => {
			// cmd + 0
			if (e.metaKey && e.key === "0") {
				e.preventDefault();
				window.location.href = "/admin";
			}
		});
	}, []);

	return (
		<html
			lang="en"
			className="bg-background h-full w-full transition-all text-foreground scroll-smooth select-none"
		>
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				{/* <script defer data-domain="jedwards.cc" src="/js/script.js" /> */}
				<Meta />
				<Links />
			</head>
			<body className="relative mx-auto h-full w-full max-w-10xl">
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}

export function ErrorBoundary() {
	const error = useRouteError() as Error;

	const getFragment = (error: Error) => {
		if (isRouteErrorResponse(error)) {
			return (
				<div>
					<h1>
						{error.status} {error.statusText}
					</h1>
					<p>{error.data}</p>
				</div>
			);
		} else if (error instanceof Error) {
			return (
				<div>
					<h1>Error</h1>
					<p>{error.message}</p>
					<p>The stack trace is:</p>
					<pre>{error.stack}</pre>
				</div>
			);
		} else {
			return <h1>Unknown Error</h1>;
		}
	};

	return (
		<html
			lang="en"
			className="bg-background h-full w-full transition-all text-foreground scroll-smooth select-none"
		>
			<head>
				<title>Oh no!</title>
				<Meta />
				<Links />
			</head>
			<body className="flex h-full gap-4 w-full flex-col items-center justify-center">
				{getFragment(error)}
				<Button asChild variant="link">
					<Link to="/">Go Home</Link>
				</Button>
				<Scripts />
			</body>
		</html>
	);
}
