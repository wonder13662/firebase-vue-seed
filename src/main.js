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
      this.$store.commit('auth/SET_USER_DATA', user?{ email: user.email }:null)
    })
    // TODO router-guard 만들기
    // 1. 로그인 상태
    // 1-1. Dashboard 보임
    // 1-2. Login/SignUp 버튼 숨김
    // 1-3. LogOut 버튼 보임
    // 2. 로그아웃 상태
    // 2-1. Dashboard 숨김
    // 2-2. Login/SignUp 버튼 보임
    // 2-3. LogOut 버튼 보임
  },
}).$mount('#app')
