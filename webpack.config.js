const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const Dotenv = require('dotenv-webpack');

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
  name: 'redux-toolkit-tutorials',
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
  plugins: [new RefreshWebpackPlugin(), new Dotenv()],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },

  devServer: {
    hot: true,
    devMiddleware: {
      publicPath: '/dist',
    },
    static: { directory: path.resolve(__dirname, 'public') },
    client: {
      logging: 'error',
    },
    historyApiFallback: true,
  },
};
