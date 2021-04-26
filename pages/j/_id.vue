<template>
  <SocialHeader title="Einladung zu Stadt Land Fluss" description="Trete deinen Freunden bei und spiele Stadt Land Fluss" />
</template>

<script>
export default {
  head: {
    title: 'Einladung zu Stadt Land Fluss'
  },

  fetch({ redirect, params, $auth }) {
    if($auth.loggedIn) {
      redirect('/g/' + params.id + '/')
    } else {
      redirect('/auth/login?message=login_needed')
    }
  }
}
</script>

<style>

</style>