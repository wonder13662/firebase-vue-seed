import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import { store } from './store'
import firebase from '@/services/firebase'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  created() {
    firebase.init()
    firebase.onAuthChanged((user) => {
      this.$store.commit('auth/SET_USER_DATA', { email: user.email })
    })
    // TODO router-guard 만들기
  },
}).$mount('#app')
