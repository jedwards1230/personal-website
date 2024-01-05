const { PHASE_PRODUCTION_BUILD } = require("next/constants");
const { withPlausibleProxy } = require("next-plausible");

const isProd = process.env.NODE_ENV === PHASE_PRODUCTION_BUILD;

/** @type {import('next').NextConfig} */
const nextConfig = {
	...(isProd && {
		compiler: {
			removeDebugger: true,
		},
	}),
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

module.exports = withPlausibleProxy()(nextConfig);
