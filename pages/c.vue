<template>
  
</template>

<script>
const rs = require('randomstring');

export default {
  head: {
    title: 'Ein Stadt Land Fluss spiel erstellen'
  },

  created() {
    this.$router.push('/g/' + rs.generate({ length: 12, charset: 'alphanumeric' }) + '/')
  }
}
</script>

<style>

</style>