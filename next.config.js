const { PHASE_PRODUCTION_BUILD } = require('next/constants');
const { withPlausibleProxy } = require('next-plausible');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: '/resume',
                destination: '/Justin Edwards - Resume.pdf',
            },
        ];
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

    return nextConfig;
};

module.exports = withPlausibleProxy()(removeConsole(process.env.PHASE));
