const path = require('path');
const { parsed: localExampleEnv } = require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });
const webpack = require('webpack');

const nextConfig = {
  webpack: config => {
    config.plugins.push(new webpack.EnvironmentPlugin(Object.keys(localExampleEnv)));
    return config;
  },
};

module.exports = nextConfig;
