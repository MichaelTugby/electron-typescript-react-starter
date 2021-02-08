import path from "path";
import { DefinePlugin } from "webpack";
import TsConfigPathsWebpackPlugin from "tsconfig-paths-webpack-plugin";

import TerserWebpackPlugin from "terser-webpack-plugin";
import { ProgressPlugin } from "webpack";

import type { Configuration } from "webpack";

export const isDevelopment =
  process.env.NODE_ENV === "production" ? false : true;

export default {
  mode: isDevelopment ? "development" : "production",
  devtool: isDevelopment ? "cheap-module-source-map" : false,
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    minimize: !isDevelopment,
    minimizer: [new TerserWebpackPlugin()],
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx"],
    plugins: [new TsConfigPathsWebpackPlugin() as any], // Temporary until tsconfig paths types are fixed for webpack 5
  },
  plugins: [
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
    }),
    new ProgressPlugin(),
  ],
} as Configuration;
