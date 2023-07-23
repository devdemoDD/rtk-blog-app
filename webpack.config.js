const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/*
CSS관련 로더에 대한 역할
✔️ style-loader
→ Inject CSS into the DOM.

✔️ css-loader
→ @import and url() like import/require() and will resolve them.

✔️ postcss-loader
→ Loader to process CSS with PostCSS

✔️ sass-loader
→ Loads a Sass/SCSS file and compiles it to CSS.
*/

module.exports = {
  name: 'redux-toolkit-blog-app',
  mode: 'development',
  resolve: {
    extensions: ['.js'],
  },
  entry: {
    main: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test: /\.module\.css$|\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new RefreshWebpackPlugin(),
    new Dotenv(),
    new HtmlWebpackPlugin({
      title: 'ReduxToolKit Blog App',
      template: path.join(__dirname, 'public/index.html'),
    }),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },

  devServer: {
    hot: true,
    client: {
      logging: 'error',
    },
    historyApiFallback: true,
  },
};
