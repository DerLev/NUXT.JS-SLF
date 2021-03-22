<template>
  
</template>

<script>
const rs = require('randomstring');

export default {
  created() {
    this.$router.push('/g/' + rs.generate({ length: 12, charset: 'alphanumeric' }) + '/')
  }
}
</script>

<style>

</style>