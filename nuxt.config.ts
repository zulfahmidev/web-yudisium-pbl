// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    'nuxt-vuefire',
    '@nuxtjs/tailwindcss',
  ],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config',
    exposeConfig: false,
    exposeLevel: 2,
    config: {},
    injectPosition: 'first',
    viewer: true,
  },
  vuefire: {
    config: {
      apiKey: 'AIzaSyBSKEOKiN02-VR513rnCTkgEDALmzmgPxs',
      authDomain: 'yudisium-pnl.firebaseapp.com',
      projectId: 'yudisium-pnl',
      storageBucket: 'yudisium-pnl.appspot.com',
      messagingSenderId: '753934366540',
      appId: '1:753934366540:web:e35e366a3718df480181e9',
    },
  },
})
