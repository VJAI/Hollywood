import webpack from 'webpack';
import yargs from 'yargs';

const { optimizeMinimize } = yargs.alias('p', 'optimize-minimize').argv;
const nodeEnv = optimizeMinimize ? 'production' : 'development';

export default {
  entry: {
    Hollywood: './src/index.js'
  },
  output: {
    path:'./dist',
    filename: optimizeMinimize ? '[name].min.js' : '[name].js',
    library: 'Hollywood',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: "babel-loader", exclude: /node_modules/},
      {test: /\.scss$/, loader: 'style!css!sass'},
      {test: /\.(jpg|png|gif)$/, loader: 'url-loader?limit=12288'}
    ]
  },
  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    }
  ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
    })
  ],
  devtool: optimizeMinimize ? 'source-map' : null
};
