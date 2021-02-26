import { merge } from "webpack-merge";
import baseConfig from "./webpack.base.config";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

export default merge(baseConfig, {
  entry: {
    main: "./src/main",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: require.resolve("babel-loader"),
      },
    ],
  },
  output: {
    filename: "main.js",
  },
  target: "electron-main",
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "reports/main.html",
      openAnalyzer: false,
    }),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: "./src/main/*.ts",
      },
      typescript: {
        configOverwrite: {
          include: ["./src/main"],
        },
      },
    }),
  ],
});
