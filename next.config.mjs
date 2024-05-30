import { PHASE_PRODUCTION_BUILD } from "next/constants.js";
import { withPlausibleProxy } from "next-plausible";
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

const isProd = process.env.NODE_ENV === PHASE_PRODUCTION_BUILD;

if (!isProd) {
	await setupDevPlatform();
}

/** @type {import('next').NextConfig} */
const nextConfig = {
	...(isProd && { compiler: { removeDebugger: true } }),
	experimental: { reactCompiler: true },
	eslint: { ignoreDuringBuilds: true },
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
