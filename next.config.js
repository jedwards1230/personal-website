const { PHASE_PRODUCTION_BUILD } = require('next/constants');
const withMDX = require('@next/mdx')();

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: 'export',
    experimental: {
        appDir: true,
        mdxRs: true,
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

module.exports = withMDX(removeConsole(process.env.PHASE));
