/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-param-reassign */

const dotenv = require('dotenv');
const withPlugins = require('next-compose-plugins');
const nextImages = require('next-images');
const nextFonts = require('next-fonts');
const svgr = require('next-svgr');
const path = require('path');

dotenv.config();

const nextConfig = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty',
      };
    }

    // add polyfills to all browsers
    const originalEntry = config.entry;

    config.entry = async () => {
      const entries = await originalEntry();

      if (entries['main.js'] && !entries['main.js'].includes('./client/polyfills.js')) {
        entries['main.js'].unshift('./client/polyfills.js');
      }

      return entries;
    };

    // fix resolving react in @apollo/client package
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        react: path.resolve(__dirname, 'node_modules/react'),
      },
    };

    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });

    return config;
  },
  env: {
    ASSET_HOST: process.env.ASSET_HOST || '',
    API_URL: process.env.API_URL,
  },
  assetPrefix: process.env.ASSET_HOST || '',
  experimental: {
    modern: true, // split bundles for modern/old browsers (production mode only)
    polyfillsOptimization: true,
  },
};

module.exports = withPlugins([[nextImages], [nextFonts], [svgr]], nextConfig);
