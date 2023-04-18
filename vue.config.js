const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    assetsDir: 'passengerapp',
    publicPath:'./',
    filenameHashing:false,
    //
    devServer: {
        port:8080,
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
            },
            "/ysyx_passengerorderquery": {
                target: "http://localhost:8330",
                changeOrigin: true,
                pathRewrite: {
                    "^/ysyx_passengerorderquery": ""
                }
            },
        }
    }
})
