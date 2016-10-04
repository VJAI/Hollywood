import webpack from 'webpack';
import yargs from 'yargs';

const {optimizeMinimize} = yargs.alias('p', 'optimize-minimize').argv;
const nodeEnv = optimizeMinimize ? 'production' : 'development';

export default {
  entry: {app: './'},
  output: {
    path: './dist',
    filename: optimizeMinimize ? 'hollywood.min.js' : 'hollywood.js',
    library: 'Hollywood',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
      {test: /\.scss$/, loader: 'style!css!sass'}
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
    })
  ],
  devtool: optimizeMinimize ? 'source-map' : null
};
