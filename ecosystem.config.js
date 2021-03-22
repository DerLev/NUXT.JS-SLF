module.exports = {
    apps: [
      {
        name: 'McMineserver NUXT.JS SLF',
        exec_mode: 'fork',
        instances: '1',
        script: './node_modules/nuxt/bin/nuxt.js',
        args: 'start'
      }
    ]
  }