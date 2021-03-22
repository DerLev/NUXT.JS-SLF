<template>
  
</template>

<script>
export default {
  created() {
    this.$router.push('/g/' + this.$route.params.id + '/')
  }
}
</script>

<style>

</style>