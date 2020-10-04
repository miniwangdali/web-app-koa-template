const path = require("path");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",

  entry: [path.resolve(__dirname, "../src/client/app.tsx")],
  // Enable sourcemaps for debugging webpack's output.
  devtool: process.env.NODE_ENV !== "production" ? "source-map" : null,
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", "json"]
  },

  module: {
    rules: [
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "./tsconfig.client.json")
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          process.env.NODE_ENV !== "production"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [autoprefixer]
              }
            }
          },
          "resolve-url-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: process.env.NODE_ENV !== "production"
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: "style!css!postcss"
      }
    ]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../dist/public"),
    publicPath: "./"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/public/index.html")
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};
