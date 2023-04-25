import DarkModeHandler from "@/components/darkMode";
import "@/globals.css";

import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<DarkModeHandler>
			<html lang="en">
				<body>
					{children}
					<Analytics />
				</body>
			</html>
		</DarkModeHandler>
	);
}
