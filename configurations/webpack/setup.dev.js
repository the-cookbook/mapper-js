const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const rules = require('./rules');

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || '3300';

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    publicPath: '/',
    path: path.join(__dirname, '../../public'),
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[name].chunk.js',
  },
  module: {
    rules,
  },
  devServer: {
    contentBase: './public',
    noInfo: true,
    hot: true,
    inline: true,
    watchContentBase: true,
    historyApiFallback: true,
    disableHostCheck: true,
    open: true,
    port: PORT,
    host: HOST,
  },
  performance: {
    hints: 'warning',
    maxAssetSize: 512000,
    maxEntrypointSize: 8500000,
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.js');
    },
  },
  optimization: {
    nodeEnv: 'development',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"development"' },
    }),
    new BundleAnalyzerPlugin({
      analyzerHost: HOST,
      openAnalyzer: process.env.NODE_ENV === 'development',
    }),
  ],
};
