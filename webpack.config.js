const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const webpack = require('webpack');

const PUBLIC_PATH = 'https://podrezo.github.io/samegame/';

const config = {
  // FIXME: Context doesn't seem to be used, have to manually specify the extra directory for entry points
  // context: path.resolve(__dirname, 'src'),  
  entry: {
    // removing 'src' directory from entry point, since 'context' is taking care of that
    app: './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './assets/js/[name].bundle.js',
    publicPath: PUBLIC_PATH,
  },
  devtool: 'inline-source-map', // not for prod
  mode: 'development',
  // Resolves node_modules if you specify a path like "mycomponent" instead of "./mycomponent"
  // Resolves js/json without needing to specify extension
  resolve: {
		modules: ['node_modules'],
		extensions: [
      '.js',
      '.json',
      '.jsx'
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new WebpackPwaManifest({
      name: 'SameGame',
      short_name: 'SameGame',
      description: 'SameGame',
      background_color: '#000000',
      crossorigin: null,
      icons: [
        {
          src: path.resolve('src/assets/icon.png'),
          sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
        }
      ]
    }),
    new SWPrecacheWebpackPlugin(
      {
        cacheId: 'same-game',
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        filename: 'service-worker.js',
        minify: true,
        navigateFallback: PUBLIC_PATH + 'index.html',
        staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
      }
    ),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /src/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['env']
          } 
        }
      },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['env', 'react']
        }
      },
      {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, 'src', 'assets', 'scss'),
          // TODO: Optionally include third-party SCSS library
          // path.resolve(__dirname, 'node_modules', 'purecss-sass', 'vendor', 'assets', 'stylesheets')
        ],
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        include: [
          path.resolve(__dirname, 'src', 'assets')
        ],
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader?name=assets/[name].[ext]',
            options: {
              limit: 4096
            }
          }
        ]
      }
    ]
  }
}

module.exports = config;