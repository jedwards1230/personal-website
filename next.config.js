const { PHASE_PRODUCTION_BUILD } = require("next/constants");
const { withPlausibleProxy } = require("next-plausible");

/** @type {import('next').NextConfig} */
const nextConfig = {
	compiler: {
		removeConsole: process.env.NODE_ENV === PHASE_PRODUCTION_BUILD,
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
