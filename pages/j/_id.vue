<template>
  <SocialHeader title="Einladung zu Stadt Land Fluss" description="Trete deinen Freunden bei und spiele Stadt Land Fluss" />
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