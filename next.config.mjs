import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";
import { withPlausibleProxy } from "next-plausible";

// Here we use the @cloudflare/next-on-pages next-dev module to allow us to use bindings during local development
// (when running the application with `next dev`), for more information see:
// https://github.com/cloudflare/next-on-pages/blob/main/internal-packages/next-dev/README.md
if (process.env.NODE_ENV === "development") {
	await setupDevPlatform();
}

/** @type {import('next').NextConfig} */
const nextConfig = {
	/* ...(process.env.NODE_ENV === "production" && {
		compiler: {
			removeDebugger: true,
		},
	}), */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "raw.githubusercontent.com",
			},
			{
				protocol: "https",
				hostname: "**.public.blob.vercel-storage.com",
			},
		],
	},
};

export default withPlausibleProxy()(nextConfig);
