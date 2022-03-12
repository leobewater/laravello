import { createStore } from 'vuex'

const store = createStore({
  state: {
    isLoggedIn: false,
  },
  getters: {},
  actions: {},
  mutations: {
    setLoggedIn(state, payload) {
      state.isLoggedIn = Boolean(payload)
    },
  },
  modules: {},
})

export default store
