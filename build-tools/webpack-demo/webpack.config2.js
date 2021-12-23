const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  // mode: 'development',

  entry: {
    index: './src/sideEffects/index.js',
  },

  output: {
    filename: '[name].bundle.js',
  },

  stats: {
    chunks: true,
  },

  devtool: false,

  // devtool: 'source-map',
};
