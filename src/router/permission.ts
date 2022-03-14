import { Router, RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { useUserStoreWithOut } from '@/store/modules/user'

import { showError } from '@/utils/element-plus'

export default function (router: Router): void {
  router.beforeEach(
    (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      const {
        meta: { perimeter }
      } = to
      // 如果该路由不需要登录凭证 则next()
      if (perimeter === true) {
        return next()
      }

      // 检测登陆状态
      const userStore = useUserStoreWithOut()
      userStore
        .checkLogin()
        .then(res => {
          if (res.data.result === '1') {
            next()
          } else {
            showError('Verification failed, please login again')
            next({ path: '/' })
          }
        })
        .catch(() => {
          next({ path: '/' })
        })
    }
  )

  router.onError(error => {
    if (error.request) {
      if (router.currentRoute['path'] === '/') {
        return router.replace({ name: '404' })
      }
    }
  })
}
