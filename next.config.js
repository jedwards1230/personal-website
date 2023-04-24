/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		appDir: true,
	},
	webpack(config, { isServer }) {
		config.experiments = { ...config.experiments, asyncWebAssembly: true };

		if (isServer) {
			config.output.webassemblyModuleFilename =
				"./../static/wasm/[modulehash].wasm";
		} else {
			config.output.webassemblyModuleFilename =
				"static/wasm/[modulehash].wasm";
		}

		return config;
	},
};

module.exports = nextConfig;
