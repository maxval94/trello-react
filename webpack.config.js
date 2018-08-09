const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  const IS_DEVELOPMENT = argv.mode === "development";

  return {
    entry: {
      main: "./src/index.js",
      login: "./src/login.js"
    },
    output: {
      path: path.resolve(__dirname, "public"),
      filename: "javascripts/[name].js"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: IS_DEVELOPMENT
              }
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: IS_DEVELOPMENT && "inline",
                config: {
                  ctx: {
                    env: argv.mode,
                    cssnano: {
                      preset: "default"
                    },
                    autoprefixer: {
                      grid: true
                    }
                  }
                }
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: IS_DEVELOPMENT
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: IS_DEVELOPMENT
          ? "stylesheets/style.css"
          : "stylesheets/style.min.css"
      })
    ],
    watch: IS_DEVELOPMENT,
    devtool: IS_DEVELOPMENT && "cheap-eval-source-map"
  };
};
