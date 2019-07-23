const resolve = require('path').resolve
module.exports = {
  /**
   * 路由配置
   * @type {Object}
   */
  router: {
    base: '/',
    middleware: ['frame', 'config', 'refund-address'],
    extendRoutes(routes) {
      //首页 
      routes.push({
        name: 'index',
        path: '/',
        component: resolve(__dirname, 'pages/auth/login')
      });
    }
  },
  /*
   ** Headers of the page
   */
  head: {
    title: '兽兽淘',
    meta: [{ charset: 'utf-8' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '' }, ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#14ae67' },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLINT on save
     */
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          // loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    build: {
      vendor: ['axios']
    }
  },
  loading: {
    color: '#5FB878',
    height: '2px'
  },
  // 插件配置
  plugins: [{ src: '~plugins/vue-quill-editor', ssr: false }, { src: '~plugins/element-ui', ssr: true }],
  css: [ //
    '~node_modules/element-ui/lib/theme-chalk/index.css', //ElementUI
    'quill/dist/quill.snow.css', //
    'quill/dist/quill.bubble.css', //
    'quill/dist/quill.core.css', //
    '~/assets/css/reset.less', //覆盖默认
    '~/assets/css/common.less', //公共
    '~/assets/css/frame.less', //界面公共
  ],
  // cache: true
}