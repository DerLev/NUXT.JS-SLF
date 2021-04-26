<template>
  <SocialHeader title="Ein Stadt Land Fluss Spiel erstellen" description="Erstelle ein Stadt Land Fluss Spiel" />
</template>

<script>
const rs = require('randomstring');

export default {
  head: {
    title: 'Ein Stadt Land Fluss Spiel erstellen'
  },

  fetch({ redirect, $auth }) {
    if($auth.loggedIn) {
      redirect('/g/' + rs.generate({ length: 12, charset: 'alphanumeric' }) + '/')
    } else {
      redirect('/auth/login?message=login_needed')
    }
  }
}
</script>

<style>

</style>