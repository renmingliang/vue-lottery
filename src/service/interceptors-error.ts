/**
 * 针对API接口反馈异常状态拦截处理
 * 目前包含两大类拦截处理
 * 1.通过axios请求处理
 * 2.通过el-upload组件上传请求处理
 */
import { showError } from '../utils/element-plus'
import { ERROR_EXPIERES, ERROR_UNAUTHORIZED, ERROR_TIMEOUT } from './config'
import { useUserStoreWithOut } from '@/store/modules/user'

/**
 * @param event<Object> XHR异常对象
 * @param msg<String> 未匹配status时默认提示语
 * 通过status码区分
 */
export default (event, msg = '连接错误') => {
  const { data = {}, status } = event || {}
  switch (status) {
    // 会话失效
    case ERROR_EXPIERES:
      showError({
        message: data.message || '会话失效，请重新登录',
        onClose: () => {
          const userStore = useUserStoreWithOut()
          userStore.logout()
        }
      })
      break
    // 登录超时
    case ERROR_TIMEOUT:
      showError(data.message)
      break
    // 未授权
    case ERROR_UNAUTHORIZED:
      showError(data.message || '403权限错误')
      break
    default:
      showError(`${data.message || msg + (status || '')}`)
  }
}
