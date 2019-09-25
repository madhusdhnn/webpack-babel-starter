const path = require('path');
const webpack = require('webpack');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: '[name].[hash].css',
  chunkFilename: '[name].[hash].css'
});

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, 'src', 'index.html'),
  filename: 'index.html',
  minify: {
    removeAttributeQuotes: true,
    collapseWhitespace: true,
    removeComments: true
  }
});

const terserWebpackPlugin = new TerserWebpackPlugin();

const prodConfig = {
  mode: 'production',
  devtool: false,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].min.js',
    chunkFilename: '[name].[hash].min.js'
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin({}),
      terserWebpackPlugin,
      htmlWebpackPlugin
    ]
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    miniCssExtractPlugin,
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
};

module.exports = merge(common, prodConfig);
