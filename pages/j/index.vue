<template>
  <div>
    <SocialHeader title="Einem Spiel beitreten" description="Trete deinen Freunden bei und spiele Stadt Land Fluss" />
    <v-row justify="center" align="center">
      <v-col cols="12" sm="12" md="12">
        <v-card>
          <v-card-title>
            Stadt Land Fluss
          </v-card-title>
          <v-card-text>
            <p>Füge hier den Einladungslink ein</p>
            <v-form @submit.prevent="join">
              <v-text-field label="Game-URL" v-model="url" ref="joinfield"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block large @click="join" :disabled="!url"><v-icon>mdi-link</v-icon>&ensp;Spiel beitreten</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Einem Spiel beitreten'
  },

  data:() => ({
    url: '',
  }),

  mounted() {
    this.$refs.joinfield.focus()
  },

  methods: {
    join() {
      const id = this.url.split('/').slice(4)[0]
      if(id == undefined) {
        this.$router.push('/')
        this.$notification.showMessage({content: "Spiel kann nicht gefunden werden", color: "red"})
      } else {
        if(this.$auth.loggedIn) {
          this.$router.push('/g/' + id + '/')
          this.$notification.showMessage({content: "Spiel beigetreten", color: "primary"})
        } else {
          this.$router.push('/auth/login?message=login_needed')
        }
      }
    }
  }
}
</script>

<style>

</style>