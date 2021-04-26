<template>
  <v-dialog v-model="dialog" width="750" transition="dialog-transition" persistent eager>
    <v-card light>
      <v-card-title>
        Leckere Kekse
      </v-card-title>
      <v-card-text>
        <p>
          Wir benutzen hier Cookies nur um diese Meldung zu steuern<br />
          und deinen Discord-Login zu speichern.
        </p>
      </v-card-text>
      <v-card-actions>
        <v-btn color="green" text block @click="dismiss">Ok nice</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    }
  },

  mounted() {
    if(this.$cookie.get('cc-dismissed') == true) {
      this.dialog = false
    } else {
      this.dialog = true
    }
  },

  methods: {
    dismiss() {
      this.$cookie.set('cc-dismissed', true, {
        sameSite: true,
        maxAge: 60 * 60 * 24 * 365 * 10,
      })
      this.dialog = false
    }
  }
}
</script>

<style>

</style>