const path = require('path')

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
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
    },
    productionBrowserSourceMaps: true,
};

module.exports = nextConfig;

// https://www.bravolt.com/post/deploying-next-js-to-github-pages