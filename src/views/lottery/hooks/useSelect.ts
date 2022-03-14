import { watch, ref } from 'vue'
import { TIMES_OPTIONS } from '../define'

export const useSelect = function ({ initial, userData, awardOptions }) {
  const maxNum = ref('') // 本轮奖项总人数
  const maxTimes = ref('5') // 单次最大抽取人数
  const timesOptions = ref(TIMES_OPTIONS) // 单次抽取选项
  const rollIdArr = ref([]) // 当前抽中集合
  const rollLen = ref(0) // 本轮已抽中用户数
  const maxAward = ref('') // 本轮奖项类别
  const maxAwardTips = ref('请选择抽取奖项') // 本轮奖项名称

  // 随机比例返回抽取结果
  const getRand = function () {
    return Math.floor(Math.random() * userData.value.length)
  }

  // 修改单次抽取个数
  const changeTimes = function (val) {
    const rnd = getRand()
    rollIdArr.value = userData.value.slice(rnd, rnd + Number(val))
  }

  // 修改奖项及本轮人数
  const changeAward = function (val) {
    // 重置本轮已抽取奖项人数
    rollLen.value = 0
    // 本轮奖项总人数
    awardOptions.value.map(item => {
      if (item.value === val) {
        maxNum.value = item.number ? item.number : '99'
        maxAwardTips.value = item.label
        // 8.1.1本轮总人数小于单次抽取人数
        if (Number(maxNum.value) < Number(maxTimes.value)) {
          maxTimes.value = maxNum.value
          changeTimes(maxTimes.value)
        }
      }
    })
    // 8.2单次可供抽取人数
    timesOptions.value.map(item => {
      if (Number(item.value) > Number(maxNum.value)) {
        item.disabled = true
      } else {
        item.disabled = false
      }
    })
  }

  // 监听是否读取数据完成，并初始化显示抽取集合
  watch(initial, () => {
    rollIdArr.value = userData.value.slice(0, maxTimes.value)
  })

  return {
    maxNum,
    maxTimes,
    maxAward,
    rollLen,
    rollIdArr,
    maxAwardTips,
    timesOptions,
    changeTimes,
    changeAward,
    getRand
  }
}
