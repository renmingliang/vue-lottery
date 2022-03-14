import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Login from '../views/login/index.vue'

import nprogress from './nprogress'
import permission from './permission'
import metaTitle from './metaTitle'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: Login,
    meta: { perimeter: true, title: '登录' }
  },
  {
    path: '/onload',
    name: 'onload',
    meta: { title: '数据加载' },
    component: () => import(/* webpackChunkName: "onload" */ '../views/onload/index.vue')
  },
  {
    path: '/lottery',
    name: 'lottery',
    meta: { title: '抽奖' },
    component: () => import(/* webpackChunkName: "lottery" */ '../views/lottery/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

metaTitle(router)
nprogress(router)
permission(router)

export default router
