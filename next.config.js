const { PHASE_PRODUCTION_BUILD } = require('next/constants');
const { withPlausibleProxy } = require('next-plausible');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        serverActions: true,
    },
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
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
                    },
                ],
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
