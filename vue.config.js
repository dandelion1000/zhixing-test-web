const autoprefixer = require('autoprefixer');
const pxtoviewport = require('postcss-px-to-viewport');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const path = require('path');
const resolve = dir => {
    return path.join(__dirname, dir);
};

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('_c', resolve('src/components'));
    },
    configureWebpack: config => {
        if (isProduction) {
            // 开启gzip压缩
            const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
            config.plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: productionGzipExtensions,
                    threshold: 10240,
                    minRatio: 0.8
                })
            );
        }
    },
    css: {
        extract: !!isProduction,
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer(),
                    pxtoviewport({
                        viewportWidth: 375,
                        // 该项仅在使用 Circle 组件时需要
                        // 原因参见 https://github.com/youzan/vant/issues/1948
                        selectorBlackList: ['van-circle__layer']
                    })
                ]
            }
        }
    },
    publicPath: './',
    devServer: {
        port: 8989, // 端口号
        https: false, // https:{type:Boolean}
        // open: true, // 配置自动启动浏览器
        // hotOnly: true, // 热更新
        proxy: {
            '/': {
                target: 'http://chouqin-123.vicp.net',
                ws: true,
                changeOrigin: true,
                secure: false
                // pathRewrite: {
                //   '^/api': '/api'
                // }
            }
        }
    }
};
