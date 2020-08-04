const path = require('path');
const app = require('../../package.json');
const TerserJSPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const appSource = 'demo';

module.exports = {
  entry: {
    app: ['core-js', 'react-hot-loader/patch', `./${appSource}/application.tsx`],
  },
  resolve: {
    mainFields: ['browser', 'module', 'main'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.json'],
    modules: [path.resolve(__dirname, '../../', appSource), 'node_modules'],
    alias: {
      '@cookbook/mapper-js': path.resolve(__dirname, '../../src'),
    },
  },
  target: 'web',
  optimization: {
    namedModules: true,
    noEmitOnErrors: true,
    concatenateModules: true,
    minimizer: [
      new TerserJSPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            toplevel: true,
          },
          mangle: {
            toplevel: true,
          },
          output: {
            beautify: false,
          },
        },
        sourceMap: true,
        parallel: true,
        cache: false,
      }),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          minChunks: 2,
        },
        default: {
          minChunks: 2,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: `./${appSource}/assets/favicon/*`, to: '', flatten: true },
        { from: `./${appSource}/assets/css/*`, to: 'css', flatten: true },
      ],
    }),
    new HtmlWebpackPlugin({
      template: './demo/index.html',
      title: app.name,
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: false,
      },
    }),
  ],
};
