module.exports = (config, env, helpers) => {
  // 容許 svg inline 至 jsx 內
  require("preact-cli-svg-loader")(config, helpers);

  // 不要給使用者看到source map
  config.devtool = false;

  // 測試主機
  if (!env.isProd) {
    config.devServer.proxy = [
      {
        path: "/wapi/**/*",
        target: "http://10.4.17.43:7777",
      },
      {
        path: "/api/**/*",
        target: "http://10.4.17.43:7777",
      },
    ];
  }

  // 回傳
  return config;
};
