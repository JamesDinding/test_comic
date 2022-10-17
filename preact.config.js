module.exports = (config, env, helpers) => {
  // 容許 svg inline 至 jsx 內
  require("preact-cli-svg-loader")(config, helpers);

  // 不要給使用者看到source map
  config.devtool = false;

  // 測試主機
  if (!env.isProd) {
    console.log("proxy work?");
    config.devServer.proxy = [
      {
        path: "/api/**/*",
        target: "http://nsmhweb.xjun.tw",
        changeOrigin: true,
        changeHost: true,
      },
    ];
  }

  // 回傳
  return config;
};
