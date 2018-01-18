// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import axios from 'axios'
import CommUtil from './plugin/CommonUtil'

Vue.config.productionTip = false

Vue.use(CommUtil)

global.axios = axios
// axios.defaults.baseURL = 'http://code.smallcfj.club/api'
axios.defaults.baseURL = 'http://localhost:3005/api'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
