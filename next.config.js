const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const withSize = require('next-size');
//const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = withPlugins([withSass, withSize], {
  target: 'serverless',
  distDir: 'build',
  webpack(config, options) {
    config.module.rules.push(
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true // true outputs JSX tags
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader'
        }
      }
    );
    config.plugins.push(new OptimizeCSSAssetsPlugin({}));
    return config;
  }
});