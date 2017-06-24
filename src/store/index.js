import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    collections: [],
    title: '',
    input: '',
    items: [],
    combinations: [],
    index: 0
  },
  actions,
  mutations,
  getters,
  strict: debug
})
