<template>
  <div>
    <SocialHeader title="Login – Stadt Land Fluss" description="Hier können du und deine Freunde zusammen Stadt Land Fluss spielen" />
    <v-row justify="center" align="center">
      <v-col cols="12" sm="12" md="12">
        <v-card>
          <v-card-text>
            <v-btn color="#7289DA" block large @click="$auth.loginWith('discord')"><v-icon>mdi-discord</v-icon>&ensp;Login with Discord</v-btn>
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

  fetch({ redirect, $auth }) {
    if($auth.loggedIn == true) {
      redirect('/')
    }
  }
}
</script>

<style>

</style>