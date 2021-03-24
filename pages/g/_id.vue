<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12">
      <v-btn color="red" v-if="this.$store.state.name" @click="leave('Du hast das Spiel verlassen')" icon large><v-icon>mdi-exit-to-app</v-icon></v-btn>
      <v-btn color="green" v-if="this.$store.state.name && isOwner" @click="copyInvite" :disabled="!isOwner" class="ml-5"><v-icon>mdi-share</v-icon>&ensp;Invite</v-btn>
      <v-card v-if="!this.$store.state.name">
        <v-card-title>
          Stadt Land Fluss
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="login">
            <v-text-field label="Username" v-model="username" ref="loginfield"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="green" block large @click="login" :disabled="!username"><v-icon>mdi-play</v-icon>&ensp;Spiel beitreten</v-btn>
        </v-card-actions>
      </v-card>
      <div v-else>
        <br />
        <v-card v-if="gameStatusC == 'pre'">
          <v-card-title>
            Stadt Land Fluss - Pre-Game
          </v-card-title>
          <v-card-text v-if="!users.filter(user => {return user.room == $route.params.id}).length > 0" class="text-center">
            <v-progress-circular indeterminate color="yellow darken-3" size="124">Connecting...</v-progress-circular>
          </v-card-text>
          <v-card-text v-else>
            <v-row>
              <v-col>
                <v-alert type="warning" color="orange" border="left" icon="mdi-alert-circle-outline" transition="fade-transition" :value="gameRunning && !inGame">
                  Es findet gerade ein Spiel statt. Du bist in der nächsten Runde dabei.
                </v-alert>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" sm="12" md="6">
                <v-list dense>
                  <v-subheader>
                    Users
                  </v-subheader>
                  <v-slide-y-transition group tag="div">
                    <v-list-item v-for="(user, i) in users.filter(user => {return user.room == $route.params.id})" :key="i">
                      <v-list-item-action>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <div class="noselect uppercase avatar">
                              <v-avatar color="primary" size="40" v-bind="attrs" v-on="on">{{ user.username.substring(0,3) }}</v-avatar>
                            </div>
                          </template>
                          <span>{{ user.username }}</span>
                        </v-tooltip>
                      </v-list-item-action>
                      <v-list-item-title>
                        {{ user.username }}<span v-if="user.owner" class="ml-2"><v-icon color="yellow darken-3" size="18">mdi-crown</v-icon></span><span class="ml-1 grey--text font-italic font-weight-light" v-if="user.id == socket.id">Du</span>
                      </v-list-item-title>
                      <v-list-item-action v-if="isOwner">
                        <v-btn color="red" icon @click="kickUser(user.id)" :disabled="user.id == socket.id"><v-icon>mdi-account-remove</v-icon></v-btn>
                      </v-list-item-action>
                    </v-list-item>
                  </v-slide-y-transition>
                </v-list>
              </v-col>
              <v-col cols="6" sm="12" md="6">
                <v-list dense>
                  <v-subheader>
                    Kategorien
                  </v-subheader>
                  <v-slide-y-transition group tag="div">
                    <v-list-item v-for="(item, i) in categories" :key="i">
                      <v-list-item-action>
                        <v-avatar color="primary" size="32" class="noselect uppercase avatar">#{{i + 1}}</v-avatar>
                      </v-list-item-action>
                      <v-list-item-title>
                        {{item}}
                      </v-list-item-title>
                      <v-list-item-action v-if="isOwner">
                        <v-btn color="red" icon @click="deleteCategory(i)"><v-icon>mdi-delete</v-icon></v-btn>
                      </v-list-item-action>
                    </v-list-item>
                  </v-slide-y-transition>
                </v-list>
                <v-form @submit.prevent="addCategory" ref="categoriesForm" v-if="isOwner">
                  <v-text-field label="Kategorie hinzufügen" append-outer-icon="mdi-plus" @click:append-outer="addCategory" ref="addCategory"></v-text-field>
                </v-form>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions v-if="users.filter(user => {return user.room == $route.params.id}).length > 0">
            <v-btn v-if="isOwner" color="green" block large @click="startGame" :loading="isPending"><v-icon>mdi-play</v-icon>&ensp;Spiel starten</v-btn>
            <v-btn v-else color="green" block large disabled><v-icon>mdi-play</v-icon>&ensp;Der Owner muss das Spiel starten</v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-if="gameStatusC == 'timer'">
          <v-card-title>
            Stadt Land Fluss
          </v-card-title>
          <v-card-text>
            <v-avatar v-for="(user, i) in users.filter(user => {return user.room == $route.params.id})" :key="i" color="primary" size="36" class="noselect uppercase avatar mr-1 mb-10">{{ user.username.substring(0,3) }}</v-avatar>
            <div class="text-center">
              <v-progress-circular color="primary" :value="countdown_pg" rotate="270" size="124">{{ countdown }}</v-progress-circular>
            </div>
          </v-card-text>
        </v-card>
        <v-card :loading="finish ? 'red' : 'false'" v-show="gameStatusC == 'think'">
          <v-card-title>
            Stadt Land Fluss - Überlegen
          </v-card-title>
          <v-card-text>
            <v-avatar v-for="(user, i) in users.filter(user => {return user.room == $route.params.id})" :key="i" color="primary" size="36" class="noselect uppercase avatar mr-1 mb-10">{{ user.username.substring(0,3) }}</v-avatar>
            <h2 class="mb-4">Buchstabe: <span class="text-uppercase">{{letter}}</span></h2>
            <v-form ref="thinkform" @submit.prevent="sendAnswers">
              <v-text-field :label="field" v-for="(field, i) in categories" :key="i" :disabled="submitted"></v-text-field>
              <v-btn color="primary" @click="submitAnswers" :disabled="submitted" block x-large>Fertig</v-btn>
            </v-form>
            <div v-if="finish" class="text-center mt-5">
              <v-progress-circular color="red" :value="countdown_pg" rotate="270" size="124">{{ countdown }}</v-progress-circular>
            </div>
          </v-card-text>
        </v-card>
        <v-card v-if="gameStatusC == 'evaluation'">
          <v-card-title>
            Stadt Land Fluss - Auswertung
          </v-card-title>
          <v-card-text>
            <v-avatar v-for="(user, i) in users.filter(user => {return user.room == $route.params.id})" :key="i" color="primary" size="36" class="noselect uppercase avatar mr-1 mb-10">{{ user.username.substring(0,3) }}</v-avatar>
            <v-form ref="evalform">
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>
                        User
                      </th>
                      <th v-for="(head, i) in categories" :key="i">
                        {{ head }}
                      </th>
                      <th class="text-center">
                        Punkte
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, i) in player_res" :key="i">
                      <td>
                        {{ item.username }}<span class="ml-1 grey--text font-italic font-weight-light" v-if="item.id == socket.id">Du</span>
                      </td>
                      <td v-for="(res, j) in item.answers" :key="j">
                        <v-checkbox color="green" :disabled="res == null" :value="false" @change="changeEvaluation(j + categories.length * i)">
                          <template v-slot:prepend><p class="mt-1 text-no-wrap">{{res}}</p></template>
                          <template v-slot:label>{{eval_tab[j + categories.length * i]}}</template>
                        </v-checkbox>
                      </td>
                      <td class="body-1 grey--text text-center">
                        {{ points[i] }}
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn v-if="isOwner" color="primary" block large @click="reset" :loading="isPending"><v-icon>mdi-arrow-left</v-icon>&ensp;Zurück zur Lobby</v-btn>
            <v-btn v-else color="primary" block large disabled><v-icon>mdi-arrow-left</v-icon>&ensp;Der Owner muss zurück zur Lobby</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import io from 'socket.io-client';
const rs = require('randomstring');
import Vue from 'vue';

export default {
  head: {
    title: 'Stadt Land Fluss'
  },

  data:() => ({
    username: '',
    socket: io('https://api.mc-mineserver.de/slf'),
    users: [],
    categories: ['Stadt', 'Land', 'Fluss'],
    isOwner: false,
    gameStatus: 'pre',
    countdown: 5,
    countdown_pg: 100,
    letter: '',
    results: [],
    submitted: false,
    finish: false,
    player_res: [],
    eval_tab: [],
    form_length: '',
    isMounted: false,
    gameRunning: false,
    inGame: false,
    isPending: false,
  }),

  mounted() {
    this.connectToSocket()
    this.loginAlready()
    this.listen()
    try {
      this.$refs.loginfield.focus()
    } catch(err) {
      console.error(err)
    }
    this.isMounted = true
  },

  beforeDestroy() {
    this.disconnectFromSocket()
    console.log('[%cDEBUG%c] disconnected', 'color:#eb0;', 'color:#000')
  },

  computed: {
    gameStatusC() {
      if(this.inGame) {
        return this.gameStatus
      } else {
        return 'pre'
      }
    },

    points() {
      if(this.isMounted == true) {
        var i
        var arr = []
        for(i = 0; i < this.player_res.length; i++) {
          var points = 0
          var j
          for(j = 0; j < this.categories.length; j++) {
            points += this.eval_tab[i * this.categories.length + j]
          }
          arr.push(points)
        }
        return arr
      }
    }
  },

  methods: {
    connectToSocket() {
      this.socket.emit('moin')
    },

    disconnectFromSocket() {
      this.socket.close()
    },

    listen() {
      this.socket.on('consolemsg', (msg) => {
        console.log('[%cDEBUG%c] ' + msg, 'color:#eb0;', 'color:#000')
      })
      this.socket.on('users', (users) => {
        this.users = users
        const user = users.find(user => user.id === this.socket.id);
        this.isOwner = user.owner
      })
      this.socket.on('categories', (cats) => {
        this.categories = cats
      })
      this.socket.on('sync', () => {
        if(this.isOwner) {
          this.syncCategories()
          this.socket.emit('phase', this.gameStatus)
        }
      })
      this.socket.on('exit', () => {
        this.leave('Der Owner hat das Spiel verlassen')
      })
      this.socket.on('kick', (id) => {
        if(id === this.socket.id) {
          this.leave('Du wurdest vom Spiel gekickt')
        }
      })
      this.socket.on('game', (status) => {
        this.gameStatus = status
        this.isPending = false
        if(status == 'timer') {
          this.countdownTimer()
          if(this.isOwner) {
            this.randomLetter()
          }
        }
        if(status == 'think' && this.inGame == true) {
          this.results = []
          this.player_res = []
        }
        if(status == 'evaluation' && this.inGame == true) {
          this.eval_tab = []
          setTimeout(() => {
            this.form_length = this.$refs.evalform.inputs.length
            this.startEvaluation()
          }, 40)
        }
        if(status == 'pre') {
          this.finish = false
          this.submitted = false
        }
      })
      this.socket.on('finish', () => {
        this.finish = true
        this.countdownTimer()
        setTimeout(() => {
          if(!this.submitted && this.inGame == true) {
            this.submitAnswers()
          }
        }, 6000)
      })
      this.socket.on('answers', (ans) => {
        this.player_res.push(ans)
      })
      this.socket.on('letter', (ltr) => {
        this.letter = ltr
      })
      this.socket.on('eval', ({id}) => {
        if(id.state == 0) {
          var val = this.eval_tab[id.id] - 1
        } else {
          var val = this.eval_tab[id.id] + 1
        }
        Vue.set(this.eval_tab, id.id, val)
      })
      this.socket.on('inGame', (tf) => {
        this.inGame = tf
      })
      this.socket.on('running', (tf) => {
        this.gameRunning = tf
      })
    },

    login() {
      this.$store.commit('CHANGE_NAME', this.username)
      this.$cookie.set('username', this.username, {
        sameSite: true,
        maxAge: 60 * 60 * 24 * 365,
      })
      console.log('[%cCOOKIE%c] set username cookie to ' + this.username, 'color:#e50;', 'color:#000')
      this.socket.emit('login', {username: this.$store.state.name, room: this.$route.params.id})
    },

    loginAlready() {
      if(this.$store.state.name) {
        this.socket.emit('login', {username: this.$store.state.name, room: this.$route.params.id})
      }
    },

    syncCategories() {
      this.socket.emit('categories', this.categories)
    },

    async copyInvite() {
      try {
        const link = window.location.protocol + "//" + window.location.host + '/j/' + this.$route.params.id + '/'
        await this.$copyText(link);
        this.$notification.showMessage({content: 'Invite-Link kopiert', color: "green"})
      } catch (err) {
        console.error(err);
      }
    },

    leave(reason) {
      this.$router.push('/')
      this.$notification.showMessage({content: reason, color: "red"})
    },

    addCategory() {
      this.categories.push(this.$refs.addCategory.lazyValue)
      this.$refs.categoriesForm.reset()
      this.syncCategories()
    },

    deleteCategory(i) {
      this.categories.splice(i, 1);
      this.syncCategories()
    },

    kickUser(id) {
      this.socket.emit('kick', id)
      this.$notification.showMessage({content: "Spieler gekickt", color: "red"})
    },

    startGame() {
      this.socket.emit('start')
      this.isPending = true
    },

    countdownTimer() {
      if(this.countdown > -1) {
        setTimeout(() => {
          this.countdown -= 1
          this.countdown_pg = this.countdown * 20
          this.countdownTimer()
        }, 1000)
      } else {
        this.countdown = 5
        this.countdown_pg = this.countdown * 20
      }
    },

    submitAnswers() {
      var i
      if(this.submitted == false) {
        for (i = 0; i < this.$refs.thinkform.inputs.length; i++) {
          this.results.push(this.$refs.thinkform.inputs[i].lazyValue)
        }
        this.sendAnswers()
      }
      this.submitted = true
      if(!this.finish) {
        this.socket.emit('ready')
      }
    },

    sendAnswers() {
      this.socket.emit('answers', this.results)
    },

    randomLetter() {
      this.letter = rs.generate({ length: 1, charset: 'abcdefghijklmnoprstuvwz' })
      this.socket.emit('letter', this.letter)
    },

    startEvaluation() {
      var i
      var r = []
      for (i = 0; i < this.form_length; i++) {
        r.push(0)
      }
      this.eval_tab = r
    },

    changeEvaluation(index) {
      this.socket.emit('eval', {id: index, state: this.$refs.evalform.inputs[index].lazyValue ? 1 : 0})
    },

    reset() {
      this.socket.emit('reset')
      this.isPending = true
    },
  },
}
</script>

<style>

.noselect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.uppercase {
  text-transform: uppercase;
}

.avatar {
  font-size: 0.75rem;
	font-weight: 500;
	letter-spacing: 0.0892857143em;
	text-indent: 0.0892857143em;
	text-transform: uppercase;
	white-space: nowrap;
}

</style>