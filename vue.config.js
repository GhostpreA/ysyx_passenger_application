const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    // assetsDir: 'assets',
    // publicPath:'./',
    // filenameHashing:false,
    //
    devServer: {
        proxy: {
            "/ysyx_passengerinfo": {
                target: "http://localhost:8010",
                changeOrigin: true,
                pathRewrite: {
                    "^/ysyx_passengerinfo": ""
                }
            },

            "/ysyx_passengerconfirmo": {
                target: "http://localhost:8340",
                changeOrigin: true,
                pathRewrite: {
                    "^/ysyx_passengerconfirmo": ""
                }
            }
        }
    }
})
