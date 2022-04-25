const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // options…
  publicPath: "./",
  outputDir:'dist',
  assetsDir:'static',
  indexPath: "index.html",
})
