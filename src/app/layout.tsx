import type { Metadata } from "next";
import { Inter } from "next/font/google";
import PlausibleProvider from "next-plausible";
import clsx from "clsx";

import "./styles.css";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const inter = Inter({
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		template: "%s | J. Edwards",
		default: "J. Edwards",
	},
	description: "Personal Website for Justin Edwards",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className="h-full w-full scroll-smooth bg-background text-foreground transition-all"
		>
			<head>
				<PlausibleProvider
					domain="jedwards.cc"
					trackOutboundLinks={true}
					trackFileDownloads={true}
				/>
			</head>
			<body
				className={clsx(
					"relative mx-auto h-full w-full max-w-10xl",
					inter.className
				)}
			>
				{children}
			</body>
		</html>
	);
}
