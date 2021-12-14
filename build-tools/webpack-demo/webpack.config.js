const path = require('path');

module.exports = {
  mode: 'development',

  entry: {
    pageA: './src/splitChunks/pageA',
    pageB: './src/splitChunks/pageB',
    pageC: './src/splitChunks/pageC',
  },

  output: {
    filename: '[name].bundle.js',
  },

  resolve: {
    alias: {
      vendor1: path.resolve(
        __dirname,
        'src/splitChunks/fake_node_modules/vendor1.js'
      ),
      vendor2: path.resolve(
        __dirname,
        'src/splitChunks/fake_node_modules/vendor2.js'
      ),
    },
  },

  optimization: {
    chunkIds: 'named',
    // chunkIds: 'natural',

    splitChunks: {
      chunks: 'all',
      minSize: 0,

      cacheGroups: {
        commons: {
          minChunks: 2,
          maxInitialRequests: 5,
        },
        vendor: {
          test: /fake_node_modules/,
          chunks: 'initial',
          name: 'vendor',
        },
      },
    },
  },

  stats: {
    chunks: true,
  },
};
