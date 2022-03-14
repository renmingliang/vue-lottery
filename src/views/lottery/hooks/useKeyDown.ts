import { onMounted } from 'vue'
import { useLotteryStore } from '@/store/modules/lottery'
import { storeToRefs } from 'pinia'

export const useKeyDown = function ({ startFunc, stopFunc }) {
  const lotteryStore = useLotteryStore()
  const { keyBand } = storeToRefs(lotteryStore)

  // 监听键盘输入
  const keyDownHandle = function (e) {
    const keyCode = e.code
    if (keyCode === keyBand.value.start) {
      startFunc && startFunc()
    } else if (keyCode === keyBand.value.stop) {
      stopFunc && stopFunc()
    }
  }
  onMounted(() => {
    window.addEventListener('keydown', keyDownHandle)
  })

  return {
    keyBand,
    keyDownHandle
  }
}
