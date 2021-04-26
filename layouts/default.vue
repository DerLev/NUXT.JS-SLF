<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar-title v-text="title" @click="$router.push('/')" style="cursor:pointer;" />
      <v-spacer></v-spacer>
      <div v-if="$route.name != 'g-id'">
        <v-btn color="#7289DA" @click="$auth.loginWith('discord')" v-if="!$auth.loggedIn && $route.name != 'auth-login'"><v-icon>mdi-discord</v-icon>&ensp;Mit Discord einloggen</v-btn>
        <v-btn color="#7289DA" @click="$auth.logout()" v-if="$auth.loggedIn">
          <!-- <v-icon>mdi-exit-to-app</v-icon>&ensp; -->
          <v-avatar size="32">
            <img :src="'https://cdn.discordapp.com/avatars/' + $auth.user.id + '/' + $auth.user.avatar + '.png?size=64'" :alt="$auth.user.username" v-if="$auth.user.avatar != null">
            <img :src="'https://cdn.discordapp.com/embed/avatars/' + $auth.user.discriminator % 5 + '.png'" :alt="$auth.user.username" v-else>
          </v-avatar>&nbsp;
          {{$auth.user.username}}<small>#{{$auth.user.discriminator}}</small>&ensp;ausloggen
        </v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <v-container>
        <Snackbar />
        <CookieConsent />
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }} McMineserver</span>
      <v-spacer></v-spacer>
      <span><v-btn small text href="https://github.com/DerLev/NUXT.JS-SLF" target="_blank" rel="noopener noreferrer"><v-icon>mdi-github</v-icon>&ensp;GitHub</v-btn></span>
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
      title: 'Stadt Land Fluss'
    }
  },
}
</script>
