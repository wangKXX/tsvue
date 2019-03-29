import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const store = new Vuex.store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {},
  state: {},
  getters,
  actions,
  mutations
})
export default store