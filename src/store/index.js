import Vue from 'vue'
import Vuex from 'vuex'
import employees from './employees'
import ppp from './ppp'
import tabel from './tabel'
import calendar from './calendar'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    employees, ppp, tabel, calendar
  }
})
