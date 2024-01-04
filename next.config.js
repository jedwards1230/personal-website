const { PHASE_PRODUCTION_BUILD } = require("next/constants");
const { withPlausibleProxy } = require("next-plausible");

/** @type {import('next').NextConfig} */
const nextConfig = {
	compiler: {
		removeConsole: process.env.NODE_ENV === PHASE_PRODUCTION_BUILD,
	},
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
	async rewrites() {
		return [
			{
				source: "/resume",
				destination: "/Justin-Edwards-Resume.pdf",
			},
		];
	},
};

module.exports = withPlausibleProxy()(nextConfig);
