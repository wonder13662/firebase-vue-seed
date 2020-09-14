import firebase from '@/services/firebase'

const AuthModule = {
  state: {
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      firebase.setUser(payload)
    },
  },
  actions: {
    signUserUp({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')

      firebase
        .createUserWithEmailAndPassword(payload)
        .then(() => {
          commit('setLoading', false)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
        })
    },
    signUserIn({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')

      firebase
        .signInWithEmailAndPassword(payload)
        .then(() => {
          commit('setLoading', false)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
        })
    },
  },
  getters: {
    user(state) {
      return state.user
    },
  },
}

export default AuthModule
