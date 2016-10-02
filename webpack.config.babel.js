import HtmlWebpackPlugin from 'html-webpack-plugin';
import {HotModuleReplacementPlugin} from 'webpack';

export default {
  entry: {app: './'},
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
      {test: /\.scss$/, loader: 'style!css!sass'}
    ]
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
      inject: true
    })
  ],
  devtool: 'eval-source-map'
};
