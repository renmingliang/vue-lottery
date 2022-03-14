import { defineStore } from 'pinia'
import store from '@/store'
import api from '@/api'

import config from '@/utils/config'
import { clearToken } from '@/utils/auth'

interface FormState {
  username: string
  show: boolean
}
interface UserState {
  msg: string
  form: FormState
  passwordType: string
  loginLoading: boolean
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => {
    return Object.assign({}, config.login.state, {
      passwordType: 'password', // 登录页面输入框类型
      loginLoading: false // 登录状态按钮loading
    })
  },
  actions: {
    // 切换密码框类型
    TOGGLE_PWD_TYPE(val) {
      this.passwordType = val
    },
    // 切换密码框类型
    TOGGLE_LOADING(bool) {
      this.loginLoading = bool
    },
    logout() {
      clearToken()
      window.location.href = '/'
    },
    /**
     * 登录
     */
    async postLogin(data) {
      try {
        this.TOGGLE_LOADING(true)
        return await api.login(data)
      } catch (error) {
        throw error
      } finally {
        this.TOGGLE_LOADING(false)
      }
    },
    /**
     * 检测登陆状态
     */
    async checkLogin() {
      try {
        return await api.check()
      } catch (error) {
        throw error
      }
    }
  }
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store)
}
