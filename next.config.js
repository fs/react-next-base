const dotenv = require('dotenv');
const webpack = require('webpack');

dotenv.config();

const nextConfig = {
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    };

    // adds polyfills from ./client/polyfills.js to all browsers
    const originalEntry = config.entry;

    config.entry = async () => {
      const entries = await originalEntry();

      if (entries['main.js'] && !entries['main.js'].includes('./client/polyfills.js')) {
        entries['main.js'].unshift('./client/polyfills.js');
      }

      return entries;
    };

    return config;
  },
  env: {
    API_URL: process.env.API_URL,
  },
  experimental: {
    modern: true,
    polyfillsOptimization: true,
  },
};

module.exports = nextConfig;
