import { defineStore } from 'pinia'
import store from '@/store'
import api from '@/api'
import { UserItem, TypeItem } from '#/config'

interface DataState {
  userData: UserItem[]
  type: TypeItem[]
}
interface OnloadState {
  data: Nullable<DataState>
}

export const useOnloadStore = defineStore({
  id: 'onload',
  state: (): OnloadState => ({
    data: null
  }),
  actions: {
    SET_DATA(payload) {
      this.data = payload
    },
    async getDatas() {
      try {
        const res = await api.getData()
        this.SET_DATA(res.data)
        return res
      } catch (error) {
        throw error
      }
    }
  }
})

// Need to be used outside the setup
export function useOnloadStoreWithOut() {
  return useOnloadStore(store)
}
