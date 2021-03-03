import { merge } from "webpack-merge";
import baseConfig, { isDevelopment } from "./webpack.base.config";

import HtmlWebpackPlugin from "html-webpack-plugin";
import CspHtmlWebpackPlugin from "csp-html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { HotModuleReplacementPlugin } from "webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { VueLoaderPlugin } from "vue-loader";

export default merge(baseConfig, {
  entry: {
    renderer: "./src/renderer",
  },
  module: {
    rules: [
      {
        test: /\.vue?$/,
        loader: require.resolve("vue-loader"),
      },
      {
        test: /\.ts?$/,
        loader: require.resolve("babel-loader"),
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          isDevelopment
            ? require.resolve("vue-style-loader")
            : MiniCssExtractPlugin.loader,
          require.resolve("css-loader"),
          require.resolve("sass-loader"),
        ],
      },
    ],
  },
  output: {
    filename: "renderer.js",
  },
  plugins: [
    new VueLoaderPlugin() as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    new HtmlWebpackPlugin({
      template: "src/renderer/renderer.html",
      minify: {
        removeComments: !isDevelopment,
        collapseWhitespace: !isDevelopment,
        conservativeCollapse: !isDevelopment,
      },
    }),
    new CspHtmlWebpackPlugin({
      "script-src": "'self'",
      "style-src": isDevelopment ? "'unsafe-inline'" : "'self'",
    }),
    !isDevelopment && new MiniCssExtractPlugin(),
    isDevelopment && new HotModuleReplacementPlugin(),
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
  ].filter(Boolean),
  target: isDevelopment ? "web" : "browserslist",
  node: false,
});
