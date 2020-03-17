const path = require('path');
const { parsed: localExampleEnv } = require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });
const webpack = require('webpack');

const nextConfig = {
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    };

    config.plugins.push(new webpack.EnvironmentPlugin(Object.keys(localExampleEnv)));
    return config;
  },
};

module.exports = nextConfig;
