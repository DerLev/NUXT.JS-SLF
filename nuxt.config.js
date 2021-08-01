import colors from 'vuetify/es5/util/colors'

const VersionFile = require('webpack-version-file')

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
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'application-name', content: 'McMineserver' },
      { name: 'msapplication-TileImage', content: 'favicon/favicon-144.png' },
      { name: 'msapplication-TileColor', content: '#121417' }
    ],
    link: [
      { rel: 'shortcut icon', sizes: '16x16 24x24 32x32 48x48 64x64', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '57x57', href: '/favicon/favicon-52.png' },
      { rel: 'apple-touch-icon-precomposed', sizes: '57x57', href: '/favicon/favicon-52.png' },
      { rel: 'apple-touch-icon', sizes: '72x72', href: '/favicon/favicon-72.png' },
      { rel: 'apple-touch-icon', sizes: '114x114', href: '/favicon/favicon-114.png' },
      { rel: 'apple-touch-icon', sizes: '120x120', href: '/favicon/favicon-120.png' },
      { rel: 'apple-touch-icon', sizes: '144x144', href: '/favicon/favicon-144.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/favicon/favicon-152.png' }
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
    '@nuxtjs/pwa',
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
        scheme: 'oauth2',
        endpoints: {
          authorization: 'https://discord.com/api/oauth2/authorize',
          token: 'https://discord.com/api/oauth2/token',
          userInfo: 'https://discord.com/api/users/@me'
        },
        clientId: '836202253731758082',
        clientSecret: 'q-CQdjAybK8EXzd4Wp0MSFGw9XEILk1C',
        codeChallengeMethod: 'S256',
        grantType: 'authorization_code',
        scope: 'identify',
        token: {
          maxAge: 60 * 60 * 24 * 7
        },
        refreshToken: {
          maxAge: 60 * 60 * 24 * 60
        },
      },
    },
    redirect: {
      login: '/auth/login/',
      logout: '/auth/login/',
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

  pwa: {
    meta: {
      author: false,
      description: false,
      theme_color: '#272727',
      lang: false,
      ogType: false,
      ogSiteName: false,
      ogTitle: false,
      ogDescription: false,
      ogImage: false,
      ogUrl: false,
    },
    manifest: {
      name: 'Stadt Land Fluss',
      short_name: 'SLF',
      description: 'Spiele Stadt Land Fluss',
      lang: 'de',
      display: 'standalone',
      theme_color: '#272727',
    },
    workbox: {
      offline: false,
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    plugins: [
      new VersionFile({
        output: './static/version.txt',
        package: './package.json'
      })
    ]
  }
}
