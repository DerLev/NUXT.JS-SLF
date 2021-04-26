import colors from 'vuetify/es5/util/colors'

export default {
  server: {
    host: '0.0.0.0',
    port: 8007
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s – McMineserver',
    title: 'PAGE',
    htmlAttrs: {
      lang: 'de'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/notification.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-clipboard2',
    ['cookie-universal-nuxt', {alias: 'cookie'}],
    '@nuxtjs/sitemap',
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  auth: {
    strategies: {
      discord: {
        clientId: '836202253731758082',
        clientSecret: 'q-CQdjAybK8EXzd4Wp0MSFGw9XEILk1C',
        codeChallengeMethod: 'S256',
        grantType: 'authorization_code',
        scope: 'identify',
      },
    },
    redirect: {
      login: '/auth/login/',
      logout: '/',
      callback: '/auth/callback',
      home: '/'
    },
    cookie: {
      options: {
        maxAge: 60 * 60 * 24 * 365 * 10,
        secure: true,
      }
    }
  },

  sitemap: {
    hostname: 'https://slf.mc-mineserver.de',
    gzip: true,
    trailingSlash: true,
    exclude: [
      '/g/*/',
      '/j/*/',
      '/auth/callback/',
    ],
    defaults: {
      changefreq: 'monthly',
      lastmod: new Date()
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
