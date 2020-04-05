const merge = require('webpack-merge');
const commonWebpackConfig = require('./webpack.common');

const DEVELOPMENT_MODE = 'development';
const PRODUCTION_DIR = '../dist';

module.exports = merge(commonWebpackConfig, {
  mode: DEVELOPMENT_MODE,
  devtool: 'inline-source-map',
  devServer: {
    contentBase: PRODUCTION_DIR,
  },
});
