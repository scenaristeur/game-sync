import Vue from 'vue'
import Vuex from 'vuex'
import solid from './modules/solid'
import gamesync from './modules/gamesync'
import ipgs from './modules/ipgs'

Vue.use(Vuex)

export default new Vuex.Store({
  //plugins: [IdbPlugin],
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: { solid, gamesync, ipgs
  }
})