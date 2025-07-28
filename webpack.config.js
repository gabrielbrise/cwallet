const path = require("path")
const webpack = require("webpack")

module.exports = {
  entry: "./frontend/src/index.js",
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env", "@babel/preset-react"],
            plugins: [
              ["@babel/plugin-proposal-class-properties"],
              [
                "module-resolver",
                {
                  root: ["./frontend/src"],
                  alias: {
                    "components*": "./components/*",
                    "ducks*": "./ducks/*",
                    "helpers*": "./helpers/*",
                  },
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  output: {
    path: path.resolve(__dirname, "./frontend/dist/"),
    publicPath: "/",
    filename: "bundle.js",
    clean: true, // Cleans output dir before emit (webpack 5+)
  },
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "./frontend/public/"),
    },
    port: 3000,
    hot: true,
    historyApiFallback: true, // For React Router
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
}
