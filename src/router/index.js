import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/lottery',
      name: 'lottery',
      component: _import('lottery')
    },
    {
      path: '/',
      name: 'login',
      component: _import('login')
    },
    {
      path: '/onload',
      name: 'onload',
      component: _import('onload')
    }
  ]
})
