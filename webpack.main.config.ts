import path from "path";
import TsconfigPathsWebpackPlugin from "tsconfig-paths-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { Configuration, DefinePlugin } from "webpack";

const dev = process.env.NODE_ENV === "production" ? false : true;

export default {
  entry: {
    main: "./src/main/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.bundle.js",
  },
  mode: dev ? "development" : "production",
  devtool: dev ? "cheap-source-map" : false,
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: require.resolve("babel-loader"),
      },
    ],
  },
  target: "electron-main",
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
    }),
  ],
  resolve: {
    extensions: [".ts", ".js"],
    plugins: [new TsconfigPathsWebpackPlugin() as any], // Temp fix for type conflict with new webpack types
  },
} as Configuration;
