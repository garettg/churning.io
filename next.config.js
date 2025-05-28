const path = require('path');
// const { i18n } = require('./next-i18next.config')

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    assetPrefix: './',
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    reactStrictMode: true,
    swcMinify: true,
    // i18n,
    productionBrowserSourceMaps: true,
    experimental: {
        forceSwcTransforms: true,
    },
};

module.exports = nextConfig;

// https://www.bravolt.com/post/deploying-next-js-to-github-pages