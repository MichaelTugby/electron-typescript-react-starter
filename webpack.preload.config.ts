import { merge } from "webpack-merge";
import baseConfig, { isDevelopment } from "./webpack.base.config";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

export default merge(baseConfig, {
  entry: {
    main: "./src/preload",
  },
  devtool: isDevelopment ? "inline-cheap-module-source-map" : false,
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: require.resolve("babel-loader"),
      },
    ],
  },
  output: {
    filename: "preload.js",
  },
  target: "electron-preload",
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "reports/preload.html",
      openAnalyzer: false,
    }),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: "./src/preload/*.ts",
      },
      typescript: {
        configOverwrite: {
          include: ["./src/preload"],
        },
      },
    }),
  ],
});
