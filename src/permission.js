import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style

NProgress.configure({ showSpinner: false })// NProgress Configuration

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  // has token
  if (to.path === '/lottery') {
    store.dispatch('checkLogin').then(res => { // 拉取user_info
      console.log(res.data)
      if (res.data.result === '1') {
        next()
      } else {
        Message.error('Verification failed, please login again')
        next({ path: '/' })
      }
    })
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
