import { ElMessage, ElMessageBox } from 'element-plus'

const isString = val => typeof val === 'string'

export const showWarning = message => {
  const params = isString(message) ? { message } : message
  return ElMessage({
    type: 'warning',
    ...params
  })
}
export const showSuccess = message => {
  const params = isString(message) ? { message } : message
  return ElMessage({
    type: 'success',
    ...params
  })
}
export const showError = message => {
  const params = isString(message) ? { message } : message
  return ElMessage({
    type: 'error',
    ...params
  })
}
export const showInfo = (message = '') => {
  return ElMessage(message)
}

export const alert = (message, title = '', options = {}) => {
  return ElMessageBox.alert(message, title, options)
}

export const showConfirm = (str, title = '确定删除？', options = {}) => {
  options = Object.assign(
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    },
    options
  )
  return ElMessageBox.confirm(str, title, options)
}
