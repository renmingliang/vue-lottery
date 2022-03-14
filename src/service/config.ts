export const isDev = process.env.NODE_ENV !== 'production'

// 请求成功 错误码
export const ERROR_OK = 20000

// 会话失效 错误码
export const ERROR_EXPIERES = 401

// 登录超时 错误码
export const ERROR_TIMEOUT = 402

// 未授权 错误码
export const ERROR_UNAUTHORIZED = 403

// 请求超时 错误信息
export const ERROR_ECONNABORTED = 'ECONNABORTED'

// 未联网 错误信息
export const ERROR_NETWORK = 'Network Error'
