import type { Metadata } from "next";
import { Inter } from "next/font/google";
import PlausibleProvider from "next-plausible";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: {
		template: "%s | J. Edwards",
		default: "J. Edwards",
	},
	description:
		"Discover the professional world of Justin Edwards, a Full Stack Developer based in Clearwater, FL. Explore my portfolio featuring projects in NextJS, TypeScript, SQL, and AWS, and connect with me on LinkedIn and GitHub.",
	keywords:
		"Justin Edwards, Full Stack Developer, Software Engineer, NextJS, TypeScript, SQL, AWS, Portfolio, Clearwater, Florida",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<PlausibleProvider
					domain="jedwards.cc"
					trackOutboundLinks={true}
					trackFileDownloads={true}
				/>
			</head>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
