<template>
  
</template>

<script>
export default {
  head: {
    title: 'Einladung zu Stadt Land Fluss'
  },

  created() {
    this.$router.push('/g/' + this.$route.params.id + '/')
  }
}
</script>

<style>

</style>