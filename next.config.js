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
  // Start of next-offline config for service worker:
  // generateInDevMode: true,
  //transformManifest: manifest => ["/"].concat(manifest), // add the homepage to the cache
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
  workboxOpts: {
    swDest: "static/service-worker.js",
    // runtimeCaching: [
    //   {
    //     urlPattern: /^https?.*/,
    //     handler: "NetworkFirst",
    //     options: {
    //       cacheName: "offlineCache",
    //       expiration: {
    //         maxEntries: 50,
    //         maxAgeSeconds: 1 * 60 * 60,
    //         purgeOnQuotaError: true
    //       }
    //     }
    //   }
    // ]
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: "NetworkFirst",
        options: {
          cacheName: "https-calls",
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 1 * 60 * 60 // 1 hour
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  },
  experimental: {
    async rewrites() {
      return [
        {
          source: "/service-worker.js",
          destination: "/_next/static/service-worker.js"
        }
      ];
    }
  },
  // End Of next-offline config
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