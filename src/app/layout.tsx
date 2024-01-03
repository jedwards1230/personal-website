import type { Metadata } from "next";
import { Inter } from "next/font/google";
import PlausibleProvider from "next-plausible";
import clsx from "clsx";

import "./styles.css";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "edge";

const inter = Inter({ subsets: ["latin"] });

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
			className="bg-background h-full w-full transition-all text-foreground scroll-smooth"
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
