const CracoLessPlugin = require('craco-less');

const path = require('path');
const fs = require('fs');
const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            'layout-header-background': '#333',
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
        {
            plugin: require('craco-cesium')(),
        },
    ],
    webpack: {
        alias: {
            '@': resolve('src'),
            '@apis': resolve('src/apis'),
            '@views': resolve('src/views'),
            '@components': resolve('src/components'),
        },
    },
    devServer: {
        historyApiFallback: true,
        port: 3105,
        open: true,
        compress: true,
        proxy: {
            '/api/*': {
                // target: 'http://localhost:8080/',
                // target: 'http://192.168.10.205:8086/', //测试站ip
                // target: 'http://192.168.10.73:8080/', //戎宇ip
                target: 'http://192.168.10.96:8080/', //陈涛ip
                // target: "http://dubhe-gateway.moensun.cn/",
                changeOrigin: true,
                secure: false,
            },
            '/stomp': {
                // target: 'ws://192.168.10.205:8086/', //测试服务器
                // target:"ws://localhost:8080/",
                // target:"ws://192.168.10.73:8080/",//戎宇本地ip
                target: 'ws://192.168.10.96:8080/', //陈涛本地ip
                ws: true,
                changeOrigin: true,
            },
        },
    },
};
