'use strict';

const webpack = require('webpack');
const path = require('path');
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "main.css"
});

const noEmitOnErrorsPlugin = new webpack.NoEmitOnErrorsPlugin();

const progressBarPlugin = new ProgressBarPlugin({
  format: 'Build progress:' + chalk.green('[:bar] ') + chalk.green(':percent') + chalk.yellow(' (:elapsed seconds)'),
  clear: false,
});

const indexHtml = new HtmlPlugin({
  template: path.resolve(__dirname, 'src/index.html'),
  filename: path.resolve(__dirname, 'dist/index.html'),
  inject: 'body',
  title: 'Development'
});

const config = {
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    inline: true
  },
  entry: {
    main: './src/scripts/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].out.js'
  },
  plugins: [
    progressBarPlugin,
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    indexHtml,
    noEmitOnErrorsPlugin,
    extractSass,
    new webpack.ProvidePlugin({
      $: 'jquery',
      _: 'underscore'
    })
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, '/src/scripts'),
      path.resolve(__dirname, '/src/templates'),
      path.resolve(__dirname, '/src/styles'),
      path.resolve(__dirname, '/src'),
      'node_modules',
    ]
  },
  resolveLoader: {
    modules: [path.join(__dirname, './node_modules')]
  },
  module: {
	  rules: [
	    {
        test: /\.js$/,
        include: path.resolve(__dirname, 'scripts'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: ['transform-runtime'],
            cacheDirectory: true,
            sourceMap: true,
          }
        }
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        query: {
          partialDirs: [
            path.resolve(__dirname, 'src/templates/partials'),
          ]
        }
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
            use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
          },
        },
      },
    ]
	}
};

module.exports = config;