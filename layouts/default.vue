<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar-title v-text="title" @click="$router.push('/')" style="cursor:pointer;" />
      <v-spacer></v-spacer>
      <div v-if="$route.name != 'g-id'">
        <v-btn color="#7289DA" @click="$auth.loginWith('discord', { params: { prompt: 'none' } })" v-if="!$auth.loggedIn && $route.name != 'auth-login'"><v-icon>mdi-discord</v-icon><span class="d-none d-sm-inline">&ensp;Mit Discord einloggen</span></v-btn>
        <v-btn color="#7289DA" @click="$auth.logout()" v-if="$auth.loggedIn">
          <!-- <v-icon>mdi-exit-to-app</v-icon>&ensp; -->
          <v-avatar size="32">
            <img :src="'https://cdn.discordapp.com/avatars/' + $auth.user.id + '/' + $auth.user.avatar + '.png?size=64'" :alt="$auth.user.username" v-if="$auth.user.avatar != null">
            <img :src="'https://cdn.discordapp.com/embed/avatars/' + $auth.user.discriminator % 5 + '.png'" :alt="$auth.user.username" v-else>
          </v-avatar>
          <span class="d-none d-sm-inline">
            &nbsp;{{$auth.user.username}}<small>#{{$auth.user.discriminator}}</small>&ensp;ausloggen
          </span>
        </v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <v-container>
        <Snackbar />
        <CookieConsent />
        <nuxt />
        <v-snackbar v-model="pwa" timeout="-1" right top>
          Du kannst Stadt Land Fluss auf deinem Gerät installieren.<br />
          Gehe nur auf Chrome und klick auf Installieren.
          <template v-slot:action="">
            <v-btn icon @click="pwadismissed"><v-icon>mdi-close</v-icon></v-btn>
          </template>
        </v-snackbar>
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }} McMineserver</span>
      <v-spacer></v-spacer>
      <span><v-btn small text :href="'https://github.com/DerLev/NUXT.JS-SLF/commit/' + git" target="_blank" rel="noopener noreferrer"><v-icon>mdi-git</v-icon>&nbsp;{{git}}</v-btn></span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
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
      title: 'Stadt Land Fluss',
      git: process.env.NUXT_ENV_CURRENT_GIT_SHA,
      pwa: false,
    }
  },

  mounted() {
    if(this.$cookie.get('pwa-dismissed') == true) {
      this.pwa = false
    } else {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        this.pwa = false
      } else {
        this.pwa = true
      }
    }
  },

  methods: {
    pwadismissed() {
      this.$cookie.set('pwa-dismissed', true, {
        sameSite: true,
        maxAge: 60 * 60 * 24 * 365 * 10,
      })
      this.pwa = false
    }
  }
}
</script>
