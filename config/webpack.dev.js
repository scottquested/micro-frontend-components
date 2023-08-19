/* eslint-disable @typescript-eslint/no-var-requires */
const { mergeWithRules } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const commonConfig = require('./webpack.common');
const { ModuleFederationPlugin } = require('webpack').container;
const dependencies = require('../package.json').dependencies;
const federationConfig = require('../federation.config.json');
const path = require('path');

const src = [path.resolve(__dirname, '..', 'src')];

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:3001/',
    filename: '[name].js'
  },
  devServer: {
    port: 3001,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: {
      index: '/index.html'
    }
  },
  devtool: 'inline-source-map',
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: ['babel-loader', 'ts-loader'],
        include: src
      }
    ]
  },
  plugins: [
    new ESLintPlugin({ extensions: ['js', 'jsx', 'ts', 'tsx'] }),
    new ModuleFederationPlugin({
      ...federationConfig,
      filename: 'remote.js',
      shared: {
        ...dependencies,
        react: {
          singleton: true,
          requiredVersion: dependencies.react,
          eager: true
        },
        'react-dom': {
          singleton: true,
          requiredVersion: dependencies['react-dom']
        },
        'react-router-dom': {
          singleton: true,
          eager: true,
          requiredVersion: dependencies['react-router-dom']
        },
        tailwindcss: {
          singleton: true,
          eager: true,
          requiredVersion: dependencies['tailwindcss']
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};

const customMerge = mergeWithRules({
  module: {
    rules: {
      test: 'match',
      use: 'replace',
      include: 'replace'
    }
  }
});

module.exports = customMerge(commonConfig, devConfig);
