import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyPlugin from "copy-webpack-plugin";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default {
  mode: "production",
  entry: path.join(__dirname, "src", "js", "index.js"),
  output: {
    filename: "[contenthash].js",
    path: path.join(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.handlebars$/,
        use: {
          loader: "handlebars-loader",
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: path.join(
        __dirname,
        "src",
        "views",
        "layouts",
        "main.handlebars"
      ),
      filename: path.join(
        __dirname,
        "dist",
        "views",
        "layouts",
        "main.handlebars"
      ),
      templateParameters: {
        title: `{{title}}`,
        body: `{{{body}}}`,
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          context: path.join(__dirname, "src"),
          from: "views/**/*",
          to: path.join(__dirname, "dist"),
          globOptions: {
            ignore: ["**/layouts/*"],
          },
        },
      ],
    }),
  ],
};
