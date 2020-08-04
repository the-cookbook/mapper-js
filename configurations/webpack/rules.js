module.exports = [
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: ['react-hot-loader/webpack', 'babel-loader'],
  },
  {
    enforce: 'pre',
    test: /\.js$/,
    loader: 'source-map-loader',
    exclude: /(node_modules)/,
  },
  {
    test: /\.mjs$/,
    include: /node_modules/,
    type: 'javascript/auto',
  },
];
