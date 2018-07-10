module.exports = ({ file, options }) => {
  const { env, cssnano, autoprefixer } = options;

  return {
    parser: file.extname === ".sss" ? "sugarss" : false,
    plugins: {
      "postcss-import": { root: file.dirname },
      autoprefixer: env === "production" && autoprefixer,
      cssnano: env === "production" && cssnano
    }
  };
};
