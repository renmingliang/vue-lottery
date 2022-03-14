import { computed, reactive, ref } from 'vue'
import { useOnloadStore } from '@/store/modules/onload'
import { storeToRefs } from 'pinia'

export const useOnload = function ({ cacheNum }) {
  const onloadStore = useOnloadStore()
  const { data } = storeToRefs(onloadStore)

  const catchImg = ref(0) // 已缓存图片数量
  const userNum = ref(0) // 用户数据长度
  const step = reactive({
    title: '',
    status: 'wait',
    description: '校验数据是否一致'
  }) // 最后一步提示语

  const stop = reactive({
    show: false,
    tips: '叁'
  }) // 倒计时文字--叁贰壹

  const classStop = computed(() => {
    return {
      'lottery-stop': true,
      show: stop.show
    }
  }) // 利用计算属性绑定class

  // 缓存图片
  const preLoadImg = async function () {
    return new Promise((resolve, reject) => {
      const userData = data.value?.userData || []
      for (const item of userData) {
        const tempImg = new Image()
        // 图片src地址
        tempImg.src = item.HeadImg
        // 图片加载完成
        tempImg.addEventListener(
          'load',
          () => {
            catchImg.value++
            if (catchImg.value === userData.length) resolve(catchImg.value)
          },
          false
        )
        // 图片加载失败
        tempImg.addEventListener(
          'error',
          error => {
            reject(error)
          },
          false
        )
      }
    })
  }
  // 数据校验
  const validateData = function () {
    return new Promise((resolve, reject) => {
      if (catchImg.value === userNum.value && catchImg.value === cacheNum.value) {
        step.title = '成功'
        step.status = 'success'
        step.description = '3秒后进入抽奖页面'

        stop.show = true
        let endTime = 3
        const stopTimer = setInterval(() => {
          endTime--
          if (endTime === 2) {
            stop.tips = '贰'
          } else if (endTime === 1) {
            stop.tips = '壹'
          } else {
            clearInterval(stopTimer)
            return resolve(endTime)
          }
        }, 1000)
      } else {
        reject(new Error('数据校验失败'))
      }
    })
  }

  return {
    data,
    step,
    stop,
    userNum,
    catchImg,
    classStop,
    preLoadImg,
    validateData
  }
}
