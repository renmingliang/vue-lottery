import { Router } from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

export default function (router: Router): void {
  router.beforeEach(() => {
    NProgress.start() // start progress bar
  })

  router.afterEach(() => {
    NProgress.done() // finish progress bar
  })
}
