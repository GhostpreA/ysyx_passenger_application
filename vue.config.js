const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    // assetsDir: 'assets',
    // publicPath:'./',
    // filenameHashing:false,
    devServer: {
        proxy: {
            "/ysyx_passenger": {
                target: "http://localhost:8010",
                changeOrigin: true,
                pathRewrite: {
                    "^/ysyx_passenger": ""
                }
            },

            "/ysyx_order": {
                target: "http://localhost:8340",
                changeOrigin: true,
                pathRewrite: {
                    "^/ysyx_order": ""
                }
            }
        }
    }
})
