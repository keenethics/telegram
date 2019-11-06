const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
      }),
    ],
  }
};
