<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12">
      <v-card>
        <v-card-title class="overline">
          McMineserver
        </v-card-title>
        <v-card-text>
          <h1 class="mb-5">Stadt Land Fluss</h1>
          <p>
            Hier können du und deine Freunde zusammen <span class="font-weight-bold">Stadt Land Fluss</span> spielen.<br class="mb-2" />
            Ihr braucht einen Discord ??? Schau doch mal <a href="https://mc-mineserver.de/discord-server/" target="_blank" ref="noopener noreferrer" class="grey--text">hier</a> vorbei.
          </p>
          <h1 class="mb-5">Features:</h1>
          <ul class="mb-3">
            <li>Eigene Kategorien</li>
            <li>Spieler-Management über den Game-Owner</li>
            <li>Unbegrenzte Spieler und Kategorien</li>
          </ul>
          <p>
            Noch nicht überzeugt ???<br class="mb-2" />
            <v-btn small class="pl-7 pr-7" @click="startNew">Überzeug dich</v-btn>
          </p>
          <p>
            Schon gewusst ???<br class="mb-2" />
            <v-btn small class="pl-3 pr-3" href="https://github.com/DerLev/NUXT.JS-SLF" target="_blank" ref="noopener noreferrer"><v-icon>mdi-github</v-icon>&ensp;Ich bin Open-Source</v-btn>
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" large to="/j/" class="mr-5 pl-10 pr-10"><v-icon>mdi-link</v-icon>&ensp;Trete einem Spiel bei</v-btn>
          <v-btn color="green" large @click="startNew" class="pl-10 pr-10"><v-icon>mdi-play</v-icon>&ensp;Starte ein Spiel</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  head: {
    title: 'Home – Stadt Land Fluss'
  },

  methods: {
    startNew() {
      this.$router.push('/c/')
      this.$notification.showMessage({content: "Neues Spiel erstellt", color: "green"})
    },
  }
}
</script>
