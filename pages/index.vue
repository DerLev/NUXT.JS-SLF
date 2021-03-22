<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12">
      <v-card>
        <v-card-title>
          Stadt Land Fluss
        </v-card-title>
        <v-card-actions>
          <v-btn color="primary" large to="/j/" class="mr-5"><v-icon>mdi-link</v-icon>&ensp;Trete einem Spiel bei</v-btn>
          <v-btn color="green" large @click="startNew"><v-icon>mdi-play</v-icon>&ensp;Starte ein Spiel</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  head: {
    title: 'Home'
  },

  methods: {
    startNew() {
      this.$router.push('/c/')
      this.$notification.showMessage({content: "Neues Spiel erstellt", color: "green"})
    },
  }
}
</script>
