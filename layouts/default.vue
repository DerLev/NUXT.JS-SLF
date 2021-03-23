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
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
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
    console.log(this.$cookie.get('username'))
  },

  methods: {
    logout() {
      this.$router.push('/')
      this.$cookie.remove('username', {})
      this.$store.commit('CHANGE_NAME', undefined)
    }
  }
}
</script>
