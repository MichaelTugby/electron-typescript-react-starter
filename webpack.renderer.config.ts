import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import TsconfigPathsWebpackPlugin from "tsconfig-paths-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { Configuration } from "webpack";

const dev = process.env.NODE_ENV === "production" ? false : true;

export default {
  entry: {
    renderer: "./src/renderer/index.tsx"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "renderer.bundle.js",
  },
  mode: dev ? "development" : "production",
  devtool: dev ? "cheap-source-map" : false,
  module: {
    rules: [
      {
        test: /\.tsx$/,
        use: [
          {
            loader: require.resolve("babel-loader"),
            options: {
              plugins: [dev && require.resolve("react-refresh/babel")].filter(
                Boolean
              ),
            },
          },
        ],
      },
    ],
  },
  target: "electron-renderer",
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/renderer/index.html",
    }),
    new ForkTsCheckerWebpackPlugin(),
    dev && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    plugins: [new TsconfigPathsWebpackPlugin() as any], // Temp fix for type conflict with tsconfig paths plugin
  },
} as Configuration;
