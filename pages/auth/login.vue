<template>
  <div>
    <SocialHeader title="Login – Stadt Land Fluss" description="Hier können du und deine Freunde zusammen Stadt Land Fluss spielen" />
    <v-row justify="center" align="center">
      <v-col cols="12" sm="12" md="12">
        <v-card>
          <v-card-text>
            <h1 class="text-center mb-4 white--text">Login</h1>
            <v-alert type="warning" color="orange" border="left" icon="mdi-alert-outline" v-if="$route.query.message == 'login_needed'">
              Du musst dich anmelden um zu spielen
            </v-alert>
            <v-btn color="#7289DA" block large @click="$auth.loginWith('discord')"><v-icon>mdi-discord</v-icon>&ensp;Mit Discord anmelden</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Login'
  },

  fetch({ redirect, $auth, query }) {
    if($auth.loggedIn == true) {
      redirect('/')
    }
  }
}
</script>

<style>

</style>