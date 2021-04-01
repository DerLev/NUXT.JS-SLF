<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar-title v-text="title" @click="$router.push('/')" style="cursor:pointer;" />
      <v-spacer></v-spacer>
      <v-btn v-if="this.$store.state.name" text color="white" @click="logout">{{ this.$store.state.name }}&ensp;<v-icon>mdi-logout</v-icon></v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Snackbar />
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }} McMineserver</span>
      <v-spacer></v-spacer>
      <span><v-btn small text href="https://github.com/DerLev/NUXT.JS-SLF" target="_blank" ref="noopener noreferrer"><v-icon>mdi-github</v-icon>&ensp;GitHub</v-btn></span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  head() {
    return {
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$store.state.description
        },
        {
          hid: 'twitter:type',
          name: 'twitter:type',
          content: 'summary'
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.$store.state.title
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.$store.state.description
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.$store.state.image
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: 'McMineserver'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'https://slf.mc-mineserver.de' + this.$route.fullPath
        },
        {
          hid: 'og:locale',
          property: 'og:locale',
          content: 'de_DE'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$store.state.title
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.$store.state.description
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.$store.state.image
        },
      ],

      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: 'https://slf.mc-mineserver.de' + this.$route.fullPath
        }
      ]
    }
  },

  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: true,
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/'
        },
      ],
      miniVariant: false,
      title: 'Stadt Land Fluss'
    }
  },

  mounted() {
    this.$store.commit('CHANGE_NAME', this.$cookie.get('username'))
    console.log('[%cCOOKIE%c] read username from cookie: ' + this.$cookie.get('username'), 'color:#e50;', 'color:#000')
  },

  methods: {
    logout() {
      this.$router.push('/')
      this.$cookie.remove('username', {
        sameSite: true,
        maxAge: 60 * 60 * 24 * 365,
      })
      this.$store.commit('CHANGE_NAME', undefined)
      console.log('[%cCOOKIE%c] remove username cookie', 'color:#e50;', 'color:#000')
    }
  }
}
</script>
