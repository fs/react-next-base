const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const withPlugins = require('next-compose-plugins');
const nextCSS = require('@zeit/next-css');
const nextImages = require('next-images');
const svgr = require('next-svgr');

const nextConfig = {
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    };
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]',
        },
      },
    });

    return config;
  },
  env: {
    API_URL: process.env.API_URL,
    ASSET_HOST: process.env.ASSET_HOST || '',
  },
  assetPrefix: process.env.ASSET_HOST || '',
};

module.exports = withPlugins([[nextCSS], [nextImages], [svgr], [new Dotenv()]], nextConfig);
