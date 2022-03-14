import { defineStore } from 'pinia'
import store from '@/store'
import config from '@/utils/config'

interface AppState {
  pageTitle: string
  state: any
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    pageTitle: '',
    state: config.state
  }),
  getters: {
    getPageTitle: state => state.pageTitle
  },
  actions: {
    SET_TITLE(title: string): void {
      this.pageTitle = title
    }
  }
})

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store)
}
