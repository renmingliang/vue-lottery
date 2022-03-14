import axios from 'axios'

export const DEFAULT_CONTENT_TYPE = 'application/json'

// 创建axios实例
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 25000, // 请求超时时间
  headers: {
    'Content-Type': DEFAULT_CONTENT_TYPE
  }
})

// request拦截器
instance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response 拦截器
instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default instance
