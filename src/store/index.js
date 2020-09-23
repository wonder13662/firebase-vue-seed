import Vue from 'vue'
import Vuex from 'vuex'

import AuthModule from '@/store/modules/auth'
import NetworkModule from '@/store/modules/network'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    auth: AuthModule,
    network: NetworkModule,
  },
})
