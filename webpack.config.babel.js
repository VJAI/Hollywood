import webpack from 'webpack';
import yargs from 'yargs';
import autoprefixer from 'autoprefixer';

const {optimizeMinimize} = yargs.alias('p', 'optimize-minimize').argv;
const nodeEnv = optimizeMinimize ? 'production' : 'development';

export default {
  mode: 'production',
  entry: {app: './'},
  output: {
    path: __dirname + '/dist',
    filename: optimizeMinimize ? 'hollywood.min.js' : 'hollywood.js',
    library: 'Hollywood',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
      {test: /\.scss$/, loader: 'style-loader!css-loader!postcss-loader!sass-loader'}
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        postcss: [
          autoprefixer
        ]
      }
    })
  ],
  devtool: optimizeMinimize ? 'source-map' : false
};
