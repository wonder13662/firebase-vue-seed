import Vue from 'vue'
import './plugins/vuetify'
import * as firebase from 'firebase'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import { store } from './store'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCVC2hf2XrtzbLpSa_BE0BtmCKaxNYvnxk',
      authDomain: 'playground-9a00c.firebaseapp.com',
      databaseURL: 'https://playground-9a00c.firebaseio.com',
      projectId: 'playground-9a00c',
      storageBucket: 'playground-9a00c.appspot.com',
      messagingSenderId: '140017567845',
      appId: '1:140017567845:web:e20c8175c58a29533d9e8c',
      measurementId: 'G-EYJZZMVJPX',
    })
  },
}).$mount('#app')
