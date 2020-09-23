import firebase from '@/services/firebase'

export default  {
  namespaced:true,
  state: {
    user: null,
  },
  mutations: {
    SET_USER_DATA(state, payload) {
      state.user = payload
    },
    CLEAR_USER_DATA() {
      location.reload()
    },
  },
  actions: {
    signUserUp({ commit, dispatch }, payload) {
      dispatch('network/clearError', null, { root: true })

      firebase
        .createUserWithEmailAndPassword(payload)
        .then(() => {
          commit('SET_USER_DATA', payload)
          dispatch('network/setLoading', false, { root: true })
        })
        .catch(error => {
          dispatch('network/setLoading', false, { root: true })
          dispatch('network/setError', error, { root: true })
        })
    },
    signUserIn({ commit, dispatch }, payload) {
      dispatch('network/setLoading', true, { root: true })
      dispatch('network/clearError', null, { root: true })

      firebase
        .signInWithEmailAndPassword(payload)
        .then(() => {
          commit('SET_USER_DATA', payload)
          dispatch('network/setLoading', false, { root: true })
        })
        .catch(error => {
          dispatch('network/setLoading', false, { root: true })
          dispatch('network/setError', error, { root: true })
        })
    },
    /*
    signOut({ commit, dispatch }, payload) {

    },
    */
  },
  getters: {
    user(state) {
      return state.user
    },
  },
}
