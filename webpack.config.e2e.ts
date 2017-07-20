// tslint:disable:no-var-requires no-require-imports variable-name
import * as webpack from 'webpack';

const path = require('path');
const resolvePath = path.resolve.bind(path, __dirname);

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { AotPlugin } = require('@ngtools/webpack');

const config: webpack.Configuration = {
  context: resolvePath(),

  entry: resolvePath('e2e/src/e2e-main.ts'),

  output: {
    path: resolvePath('e2e/dist'),
    filename: 'app.js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: resolvePath('e2e/src/index.html'),
    }),
    new AotPlugin({
      tsConfigPath: resolvePath('tsconfig.json'),
      mainPath: resolvePath('e2e/src/e2e-main.ts'),
    }),
  ],

  resolve: {
    extensions: ['.js', '.ts'],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: '@ngtools/webpack',
      },
    ],
  },
};

module.exports = config;
