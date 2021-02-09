import { merge } from "webpack-merge";
import baseConfig, { isDevelopment } from "./webpack.base.config";

import HtmlWebpackPlugin from "html-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { HotModuleReplacementPlugin } from "webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

export default merge(baseConfig, {
  entry: {
    renderer: "./src/renderer/index.tsx",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: require.resolve("babel-loader"),
            options: {
              plugins: [
                isDevelopment && require.resolve("react-refresh/babel"),
              ].filter(Boolean),
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: "renderer.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/renderer/index.html",
      minify: {
        removeComments: !isDevelopment,
        collapseWhitespace: !isDevelopment,
        conservativeCollapse: !isDevelopment,
      },
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "reports/renderer.html",
      openAnalyzer: false,
    }),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: "./src/renderer/*.tsx",
      },
      typescript: {
        configOverwrite: {
          include: ["./src/renderer"],
        },
      },
    }),
  ].concat(
    isDevelopment
      ? [new HotModuleReplacementPlugin(), new ReactRefreshWebpackPlugin()]
      : []
  ),
  target: isDevelopment ? "web" : "browserslist",
  node: false,
});
