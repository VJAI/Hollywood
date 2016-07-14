import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  entry: {app: './test/dev'},
  module: {
    loaders: [
      {test: /\.js/, loader: 'babel-loader', exclude: /node_modules/},
      {test: /\.scss$/, loader: 'style!css!sass'},
      {test: /\.(png|gif)$/, loader: 'url-loader?limit=10000'}
    ]
  },
  plugins: [new HtmlWebpackPlugin()],
  devtool: 'eval-source-map'
};
