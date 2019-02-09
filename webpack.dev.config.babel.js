import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {HotModuleReplacementPlugin} from 'webpack';
import autoprefixer from 'autoprefixer';

export default {
  entry: {app: './dev.js'},
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
      {test: /\.scss$/, loader: 'style-loader!css-loader!postcss-loader!sass-loader'}
    ]
  },
  devServer: {
    inline: true,
    hot: true
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        postcss: [
          autoprefixer({browsers: ['last 2 versions']})
        ]
      }
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
      inject: true
    })
  ],
  devtool: 'eval-source-map'
};
