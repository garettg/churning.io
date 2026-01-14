const path = require('path');

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: 'export',
    assetPrefix: './',
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    reactStrictMode: true,
    productionBrowserSourceMaps: true,
};

module.exports = nextConfig;

// https://www.bravolt.com/post/deploying-next-js-to-github-pages