<template>
  
</template>

<script>
export default {
  head: {
    title: 'Einladung zu Stadt Land Fluss'
  },

  mounted() {
    this.$store.commit('CHANGE_TITLE', 'Einladung zu Stadt Land Fluss')
    this.$store.commit('CHANGE_DESCRIPTION', 'Trete deinen Freunden bei und spiele Stadt Land Fluss')
  },

  created() {
    this.$router.push('/g/' + this.$route.params.id + '/')
  }
}
</script>

<style>

</style>