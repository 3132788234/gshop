import Vue from 'vue'
// import Vuex from 'vuex'
import { createStore } from 'vuex'

import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

// const store = new Vuex.Store({
const store = createStore({
    state,
    mutations,
    actions,
    getters,
})

export default store