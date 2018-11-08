const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const getHtmlConfig = name => {
  return {
    template: "./src/view/" + name + ".html",
    filename: "view/" + name + ".html",
    inject: true,
    hash: true,
    chunks: ["common", "vendor", name]
  };
};
module.exports = {
  // devtool: "source-map",
  // devServer: {
  //   contentBase: path.resolve(__dirname, "dist"),
  //   contentBase: "./dist",
  //   open: true,
  //   hot: true
  // },
  devtool: "inline-source-map",
  devServer: {
    //contentBase: path.resolve(__dirname, "dist"),
    contentBase: "./dist",
    hot: true,
    open: true
  },
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
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(["dist"]),
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
        ]
      },
      {
        test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 100,
              outputPath: "resource",
              name: "[name].[ext]"
            }
          }
        ]
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
        //這邊有疑惑，到底該怎麼打共用模塊
        //   vendor: {
        //     chunks: 'initial',
        //     minChunks: 2,
        //     maxInitialRequests: 5, // The default limit is too small to showcase the effect
        //     minSize: 0, // This is example is too small to create commons chunks
        //     name: 'vendor'
        // },
        // //打包第三方类库
        // commons: {
        //     name: "commons",
        //     chunks: "initial",
        //     minChunks: Infinity
        // }
      }
    }
  }
};
