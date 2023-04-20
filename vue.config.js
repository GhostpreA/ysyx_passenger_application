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
                target: "http://localhost:8320",
                changeOrigin: true,
                pathRewrite: {
                    "^/ysyx_passengerorderquery": ""
                }
            },
            "/ysyx_payorder":{
                //该服务器为远程服务器，8210端口为了测试方便，直接公网暴露了
                //请后续改为Nginx映射
                target: "http://124.71.167.112:8210",
                // target: "http://localhost:8210",
                changeOrigin: true,
                pathRewrite: {
                    "^/ysyx_payorder":""
                }
            },
            "/ysyx_imgserver":{
                //该服务器为远程服务器，8210端口为了测试方便，直接公网暴露了
                //请后续改为Nginx映射
                target: "http://124.71.167.112:8440",
                // target: "http://localhost:8210",
                changeOrigin: true,
                pathRewrite: {
                    "^/ysyx_imgserver":""
                }
            }
        }
    }
})
