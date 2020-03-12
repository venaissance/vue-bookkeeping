const path = require('path')

// 以 vue@cli 的规则配置 svg loader
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-bookkeeping-preview/'
    : '/',
  lintOnSave: false,
  chainWebpack: config => {
    const dir = path.resolve(__dirname, 'src/assets/icons')
    // 对webpack API的封装
    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .include.add(dir).end() // 包含 icons 目录
      .use('svg-sprite-loader').loader('svg-sprite-loader').options({extract: false}).end()
      .use('svgo-loader').loader('svgo-loader')
      .tap(options => ({
        ...options,
        plugins: [{removeAttrs: {attrs: 'fill'}}]
      })) // svg优化插件：发现加载了svg就删除svg中的fill属性（不然颜色可能会变）
      .end()

    config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{plainSprite: true}])
    config.module.rule('svg').exclude.add(dir) // 让其他 svg loader 排除 icons 目录
  }
}
