const { PHASE_PRODUCTION_BUILD } = require('next/constants');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        appDir: true,
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.md$/,
            use: 'raw-loader',
        });

        return config;
    },
};

const removeConsole = (phase) => {
    if (phase === PHASE_PRODUCTION_BUILD) {
        return {
            ...nextConfig,
            compiler: {
                removeConsole: true,
            },
        };
    }

    return {
        ...nextConfig,
    };
};

module.exports = removeConsole(process.env.PHASE);
