const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    assetsDir: 'assets',
    publicPath:'./',
    filenameHashing:false,
    // devServer: {
    //     proxy: {
    //         "/passenger": {
    //             target: "http://localhost:8010",
    //             changeOrigin: true,
    //             pathRewrite: {
    //                 "^/passenger": "/passenger"
    //             }
    //         },
    //
    //         "/takecar": {
    //             target: "http://localhost:8340",
    //             changeOrigin: true,
    //             pathRewrite: {
    //                 "^/takecar": ""
    //             }
    //         }
    //     }
    // }
})
