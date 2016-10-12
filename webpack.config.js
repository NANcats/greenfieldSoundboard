// var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'public');

var config ={
  entry: APP_DIR + '/components/app.jsx',
  module : {
  loaders : [
    {
      test : /\.jsx?/,
      include : APP_DIR,
      loader : 'babel'
    }
  ]
},
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  }
};

module.exports = config;
//
// module.exports = {
//   context: __dirname + "/src",
//   devtool: debug ? "inline-sourcemap" : null,
//   entry: "src/public/client.js",
//   module: {
//     loaders: [
//       {
//         test: /|.js?$/,
//         exclude: /(node_modules)/,
//         loader: 'babel-loader',
//         query: {
//           presets: ['react', 'es2015', 'stage-0'],
//           plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
//         }
//       }
//     ]
//   },
//   output: {
//     path: __dirname + "/src/",
//     filename: "client.min.js"
//   },
//   plugins: debug ? [] : [
//     new webpack.optimize.DedupePlugin(),
//     new webpack.optimize.OccurenceOrderPlugin(),
//     new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false}),
//   ]
// };
