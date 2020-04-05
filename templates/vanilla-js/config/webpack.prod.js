const merge = require('webpack-merge');
const commonWebpackConfig = require('./webpack.common');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const PRODUCTION_MODE = 'production';

module.exports = merge(commonWebpackConfig, {
  mode: PRODUCTION_MODE,
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new CompressionPlugin({
      exclude: /\/node_modules/,
      include: /\/src/,
      test: /\.js(\?.*)?$/i,
      algorithm: 'gzip',
    }),
  ],
});
