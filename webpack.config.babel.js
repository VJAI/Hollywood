import path from 'path';

export default {
  entry: {app: './src/index.js'},
  output: {path:'./src', filename: 'hollywood.js'},
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /.html$/,
        loaders: ["raw-loader"]
      },
      {
        test: /\.(jpg|png|gif|woff|woff2|eot|ttf|svg)$/,
        loader: "file-loader?name=[path][name].[ext]"
      }
    ]
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, "./src")]
  }
};
