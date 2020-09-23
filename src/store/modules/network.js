export default {
  namespaced:true,
  state: {
    error: null,
    isLoading: false,
  },
  mutations: {
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading
    },
    SET_ERROR(state, error) {
      state.error = error
    },
    CLEAR_ERROR(state) {
      state.error = null
    },
  },
  actions: {
    clearError({ commit }) {
      commit('CLEAR_ERROR')
    },
    setError({ commit }) {
      commit('SET_ERROR')
    },
    setLoading({ commit }, isLoading) {
      commit('SET_LOADING', isLoading)
    },

  },
}
