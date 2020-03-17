const dotenv = require('dotenv');
const webpack = require('webpack');

dotenv.config();

const nextConfig = {
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    };

    return config;
  },
  env: {
    API_URL: process.env.API_URL,
  },
};

module.exports = nextConfig;
