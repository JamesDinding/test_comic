
module.exports = (config, env, helpers) => {
    // 容許 svg inline 至 jsx 內
    require('preact-cli-svg-loader')(config, helpers);

    // 不要給使用者看到source map
    config.devtool = false;

    // 測試主機
    if (!env.isProd) {
        config.devServer.proxy = [
            {
                path: "/wapi/**/*",
                target: "http://k8s-nsmhdw-c719fb2d69-1872589924.ap-east-1.elb.amazonaws.com",
            },
            {
                path: "/api/**/*",
                target: "http://k8s-nsmhdw-ce7f13072e-422525446.ap-northeast-1.elb.amazonaws.com"
            }
        ];
    }

    // 回傳
    return config;
};
