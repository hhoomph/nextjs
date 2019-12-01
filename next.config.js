const path = require("path");
const webpack = require("webpack");
const withPlugins = require("next-compose-plugins");
const withSass = require("@zeit/next-sass");
const withImages = require("next-images");
const withSize = require("next-size");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const withOffline = require("next-offline");
const { parsed: localEnv } = require("dotenv").config();
module.exports = withPlugins([withSass, withSize, withOffline], {
  //target: 'serverless',
  poweredByHeader: false,
  // staticFolder: '/static',
  // distDir: 'build',
  transformManifest: manifest => ["/"].concat(manifest), // add the homepage to the cache
  // generateInDevMode: true,
  // workboxOpts: {
  //   swDest: "static/service-worker.js"
  // },
  // experimental: {
  //   async rewrites() {
  //     return [
  //       {
  //         source: "/service-worker.js",
  //         destination: "/_next/static/service-worker.js"
  //       }
  //     ];
  //   }
  // },
  webpack(config, options) {
    config.module.rules.push(
      {
        test: /\.svg$/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "react-svg-loader",
            options: {
              jsx: true // true outputs JSX tags
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2)$/,
        use: {
          loader: "url-loader"
        }
      }
    );
    config.plugins.push(new OptimizeCSSAssetsPlugin({}), new webpack.EnvironmentPlugin(localEnv));
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: "empty"
    };
    return config;
  }
});