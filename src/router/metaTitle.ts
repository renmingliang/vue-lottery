import { useTitle } from '@vueuse/core'
import { Router, RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

export default function (router: Router): void {
  const systemName = process.env.VUE_APP_SYS_NAME
  const titleTemplate = systemName ? `%s - ${systemName}` : '%s'
  const pageTitle = useTitle('', { titleTemplate })

  router.beforeEach(
    (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      const meta = to.meta
      if (meta && meta.title) {
        pageTitle.value = <string>meta.title
      }
      next()
    }
  )
}
