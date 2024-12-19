export default defineNuxtConfig({
  imports: {
    dirs: ['stores']
  },

  ssr: false,

  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate']
      }
    ],
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@davestewart/nuxt-scrollbar',
    'nuxt-swiper'
  ],

  plugins: ['~/plugins/axios'],

  router: {
    trailingSlash: false // 關閉結尾斜槓的自動補全
  },
  generate: {
    fallback: true // 讓 404 fallback 到這個頁面
  },
  //   nitro: {
  //     // devProxy: {
  //     //     "/api/v1": {
  //     //         target:"https://cieestage.gogotest.xyz/",
  //     //         changeOrigin: true,
  //     //         prependPath: true,
  //     //     }
  //     // }
  //     routeRules: {
  //       '/**': { static: true } // 確保動態路徑被正確捕捉
  //     },
  // },
  app: {
    head: {
      title: '中國電機工程學會',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '中國電機工程學會' },
        { property: 'og:title', content: '中國電機工程學會' },
        { property: 'og:description', content: '中國電機工程學會' }
      ]
    }
  },

  compatibilityDate: '2024-09-11'
})
