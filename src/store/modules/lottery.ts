import { defineStore } from 'pinia'
import api from '@/api'
import store from '@/store'
import config from '@/utils/config'

interface LotteryState {
  [key: string]: any
}

export const useLotteryStore = defineStore({
  id: 'lottery',
  state: (): LotteryState => config.lottery.state,
  actions: {
    async postDatas(data) {
      try {
        return await api.postData(data)
      } catch (error) {
        throw error
      }
    }
  }
})

// Need to be used outside the setup
export function useLotteryStoreWithOut() {
  return useLotteryStore(store)
}
