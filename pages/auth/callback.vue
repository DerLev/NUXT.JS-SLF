<template>
  <div>
    <SocialHeader title="Oauth2 Callback – Stadt Land Fluss" description="" />
    <v-row justify="center" align="center">
      <v-col cols="12" sm="12" md="12">
        <v-card color="red" v-if="$route.query.error">
          <v-card-title>
            Error&nbsp;<code>{{$route.query.error}}</code>
          </v-card-title>
          <v-card-text>
            {{ $route.query.error_description }}
          </v-card-text>
          <v-card-actions>
            <v-btn to="/"><v-icon>mdi-home</v-icon>&ensp;Home</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Oauth2 Callback'
  }
}
</script>

<style>

</style>