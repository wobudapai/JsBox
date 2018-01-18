/**
 * Created by zy on 2016/12/15.
 */
import Vuex from 'vuex'
import Vue from 'vue'

import api from './api'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    api
	}
})
