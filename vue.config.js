const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:8010",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            },

            "/takecar": {
                target: "http://localhost:8340",
                changeOrigin: true,
                pathRewrite: {
                    "^/takecar": ""
                }
            }
        }
    }
})
