// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import './assets/styles/common.less'// custom define global less

import './permission' // permission control

Vue.use(Element, {
  size: 'medium' // set element-ui default size
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
