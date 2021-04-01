<template>
  <SocialHeader title="Ein Stadt Land Fluss Spiel erstellen" description="Erstelle ein Stadt Land Fluss Spiel" />
</template>

<script>
const rs = require('randomstring');

export default {
  head: {
    title: 'Ein Stadt Land Fluss Spiel erstellen'
  },

  created() {
    this.$router.push('/g/' + rs.generate({ length: 12, charset: 'alphanumeric' }) + '/')
  }
}
</script>

<style>

</style>