<template>
  
</template>

<script>
const rs = require('randomstring');

export default {
  head: {
    title: 'Ein Stadt Land Fluss Spiel erstellen'
  },

  mounted() {
    this.$store.commit('CHANGE_TITLE', 'Ein Stadt Land Fluss Spiel erstellen')
    this.$store.commit('CHANGE_DESCRIPTION', 'Erstelle ein Stadt Land Fluss Spiel')
  },

  created() {
    this.$router.push('/g/' + rs.generate({ length: 12, charset: 'alphanumeric' }) + '/')
  }
}
</script>

<style>

</style>