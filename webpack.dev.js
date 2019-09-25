const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = require('./webpack.common');
const merge = require('webpack-merge');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, 'src', 'index.html'),
  filename: 'index.html'
});

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  devServer: {
    /* Add proxy config here for your back end*/
    contentBase: path.join(__dirname, 'src'),
    compress: true,
    historyApiFallback: true,
    port: process.env.PORT || 3000
  },
  plugins: [htmlWebpackPlugin, new webpack.HotModuleReplacementPlugin()]
};

module.exports = merge(common, devConfig);
