// const withBundleAnalyzer = require("@next/bundle-analyzer")({ enabled: process.env.ANALYZE === "true" });
const { resolve } = require("path");

module.exports = {
  eslint: {
    dirs: []
  },
  webpack (config, { dir, defaultLoaders }) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@statistx/core": resolve(dir, "../core/src")
    };

    // config.node = {
    //   ...config.node,
    //   dns: "empty",
    //   net: "empty",
    //   tls: "empty"
    // };

    config.module.rules.unshift({
      test: /\.(tsx|ts|js|mjs|jsx)$/,
      include: [
        resolve(dir, "../core")
      ],
      use: defaultLoaders.babel
    });

    return config;
  }
};
