import { useAppStore } from '@/store/modules/app'
import { storeToRefs } from 'pinia'

export const useApp = function () {
  const app = useAppStore()
  const { state: appState } = storeToRefs(app)

  return {
    rule: appState.value.rule
  }
}
