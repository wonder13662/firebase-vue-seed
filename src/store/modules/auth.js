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
    async signUp({ commit, dispatch }, payload) {
      dispatch('network/clearError', null, { root: true })

      try {
        // 1. Set User Authentication Info - Email, Password
        await firebase.createUserWithEmailAndPassword(payload)

        // 2. Set User Info - Email, First name, Last name, Group, Team
        await firebase.createUserInfo(payload)

        dispatch('network/setLoading', false, { root: true })
        commit('SET_USER_DATA', payload)
      } catch(error) {
        dispatch('network/setLoading', false, { root: true })
        dispatch('network/setError', error, { root: true })
      }
    },
    login({ commit, dispatch }, payload) {
      dispatch('network/setLoading', true, { root: true })
      dispatch('network/clearError', null, { root: true })

      firebase
        .signInWithEmailAndPassword(payload)
        .then(() => {
          commit('SET_USER_DATA', { email: payload.email })
          dispatch('network/setLoading', false, { root: true })
        })
        .catch(error => {
          dispatch('network/setLoading', false, { root: true })
          dispatch('network/setError', error, { root: true })
        })
    },
    logout({ commit, dispatch }, payload) {
      dispatch('network/setLoading', true, { root: true })
      dispatch('network/clearError', null, { root: true })

      firebase
        .signOut()
        .then(() => {
          commit('CLEAR_USER_DATA', { email: payload.email })
          dispatch('network/setLoading', false, { root: true })
        })
        .catch(error => {
          dispatch('network/setLoading', false, { root: true })
          dispatch('network/setError', error, { root: true })
        })
    },
  },
  getters: {
    signedIn: state => {
      console.log('state.user:', state.user)
      return !!state.user
    },
  },
}
