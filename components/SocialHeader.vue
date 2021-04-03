<template>
  <span v-if="false" />
</template>

<script>
// Test on: https://cards-dev.twitter.com/validator
// Test on: https://developers.facebook.com/tools/debug/
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: 'https://api.mc-mineserver.de/v2/files/a89322ca79dcf62bf29ac3a7562205c3.png'
    }
  },

  data() {
    return {
      path: this.$route.fullPath
    }
  },

  head() {
    return {
      meta: [
        {
          hid: 'twitter:type',
          name: 'twitter:type',
          content: 'summary'
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.title
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.description
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.image
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: this.title
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: 'McMineserver'
        },
        {
          hid: 'og:locale',
          property: 'og:locale',
          content: 'de_DE'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'https://slf.mc-mineserver.de' + this.path
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.title
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.description
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.image
        },
        {
          hid: 'og:image:secure_url',
          property: 'og:image:secure_url',
          content: this.image
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: this.title
        }
      ]
    }
  }
}
</script>
