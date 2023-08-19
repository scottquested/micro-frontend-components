/* eslint-disable @typescript-eslint/no-var-requires */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

const src = path.resolve(__dirname, '..', 'src');

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss'],
    plugins: [new TsconfigPathsPlugin()]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash].css',
      chunkFilename: '[id]-[contenthash].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.m?js/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false
        },
        include: src
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.[tj]sx?$/,
        use: ['ts-loader'],
        include: src
      }
    ]
  }
};
