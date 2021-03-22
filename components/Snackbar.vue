<template>
  <v-snackbar v-model="show" :color="color" fixed top timeout="1500" multi-line>
    {{ message }}
    <template v-slot:action="">
      <v-btn text @click="show = false" icon><v-icon>mdi-close</v-icon></v-btn>
    </template>
    <v-progress-linear :value="prog" absolute bottom :color="color + ' darken-3'" rounded height="6"></v-progress-linear>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      message: '',
      color: '',
      prog: 0,
    }
  },

  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'snackbar/showMessage') {
        this.message = state.snackbar.content
        this.color = state.snackbar.color
        this.show = true
        this.prog = 0
        this.progress()
      }
    })
  },

  methods: {
    progress() {
      if(this.prog < 100 && this.show == true) {
        setTimeout(() => {
          this.prog += 10
          this.progress()
        }, 125)
      }
    }
  }
}
</script>

<style>

</style>