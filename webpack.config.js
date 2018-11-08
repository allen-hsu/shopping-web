const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const getHtmlConfig = name => {
  return {
    template: "./src/view/" + name + ".html",
    filename: "view/" + name + ".html",
    inject: true,
    hash: true,
    chunks: ["common", name]
  };
};
module.exports = {
  entry: {
    common: "./src/page/common/index.js",
    index: "./src/page/index/index.js",
    login: "./src/page/login/index.js"
  },
  output: {
    filename: "js/[name].bundle.js",
    chunkFilename: "js/[name].chunk.js",
    path: path.resolve(__dirname, "dist")
  },
  externals: {
    jquery: "window.jQuery"
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "css/index.css"
      // chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin(getHtmlConfig("index")),
    new HtmlWebpackPlugin(getHtmlConfig("login"))
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: "../"
            }
          },
          "css-loader"
        ] //多个loader,从右向左处理
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          name: "common",
          chunks: "all",
          minSize: 1,
          priority: 0
        },
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: 10
        }
      }
    }
  }
};
