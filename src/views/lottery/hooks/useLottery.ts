import { ref } from 'vue'
import { useLotteryStore } from '@/store/modules/lottery'
import { useAppStore } from '@/store/modules/app'
import { storeToRefs } from 'pinia'

import screenshot from '@/utils/screenshot'
import { alert } from '@/utils/element-plus'

let timeInterJS // 滚动定时器对象

export const useLottery = function ({
  maxAward,
  maxAwardTips,
  maxNum,
  maxTimes,
  userData,
  rollIdArr,
  rollLen,
  getRand
}) {
  const isBegin = ref(false) // 是否开始
  const lotteryStore = useLotteryStore()
  const { intervalTime, download, style } = storeToRefs(lotteryStore)

  const total = ref(0) // 累计所有抽中用户数
  // 1.开始滚动
  const beginRoll = function () {
    if (!isBegin.value) {
      // 1.0选择抽取奖项
      if (!maxAward.value) {
        alert(maxAwardTips.value)
        return false
      }
      // 1.1本轮抽奖剩余人数
      const tempLast = maxNum.value - rollLen.value
      // 1.1.0若小于单次最大抽奖人数
      if (!!tempLast && tempLast < maxTimes.value) {
        maxTimes.value = tempLast.toString()
      }
      // 1.1.1若已抽完
      if (tempLast === 0) {
        alert('本轮已抽取完毕')
        return false
      }
      // 1.2抽奖池内剩余人数
      total.value = 0
      userData.value.map(item => {
        if (item.Award !== '0') {
          total.value++
        }
      })
      const tempRoll = userData.value.length - total.value
      if (tempRoll <= maxTimes.value) {
        alert(`池内剩余总数${tempRoll}，不够本次抽取${maxTimes.value}！`)
        return false
      }
      // 1.3定时器滚动
      isBegin.value = true
      timeInterJS = setInterval(roll, intervalTime.value)
    }
  }
  // 2.结束抽取
  const stopRoll = function () {
    if (isBegin.value) {
      render()
    }
  }
  // 3.抽取结果
  const render = function () {
    clearInterval(timeInterJS)
    // 3.0设置抽中人奖项并同步至indexDB
    rollIdArr.value.map(item => {
      item.Award = maxAward.value
      updateDataByKey(item.CompleteID, maxAward.value)
    })
    // 3.1更新已抽中人数数目
    rollLen.value += rollIdArr.value.length
    // 3.2延迟时间后执行截屏下载，应为渲染是结果是异步的，需要时间
    if (download.value.show) {
      setTimeout(() => {
        screenshot(maxAward.value, maxNum.value)
      }, download.value.delay)
    }
    // 3.3回传中奖数据
    const temp = rollIdArr.value.map(item => item.Num).join(',')
    lotteryStore.postDatas({ Num: temp, Award: maxAward.value }).then(() => {
      // 3.4重置开关
      isBegin.value = false
    })
    console.log('lottery ==> user', rollIdArr.value)
  }
  // 4.滚动主要函数
  const roll = function () {
    // 4.0先清空抽中集合数组
    rollIdArr.value = []
    // 4.1更新抽中集合
    while (rollIdArr.value.length < maxTimes.value) {
      const rnd = getRand()
      const obj = userData.value[rnd]
      if (obj.Award === '0' && !findInArr(rollIdArr.value, obj)) {
        rollIdArr.value.push(obj)
      }
    }
  }
  // 5.去除已抽取观众
  const findInArr = function (arr, obj) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]['CompleteID'] === obj.CompleteID) {
        return true
      }
    }
    return false
  }

  const appStore = useAppStore()
  const { state: appState } = storeToRefs(appStore)
  // 更新数据至indexDB
  const updateDataByKey = function (CompleteID, Award) {
    if (window.indexedDB) {
      const requestDB = window.indexedDB.open(appState.value.DBname, appState.value.DBver)
      requestDB.onsuccess = function (event) {
        const mydb = (event.target as any).result
        const trans = mydb.transaction(appState.value.storeName.user, 'readwrite')
        const store = trans.objectStore(appState.value.storeName.user)
        const request = store.get(CompleteID)
        request.onsuccess = function (e) {
          const temp = e.target.result
          temp.Award = Award
          store.put(temp)
        }
      }
      requestDB.onerror = function (event) {
        alert(`打开失败,错误号：${(event.target as any).errorCode}`)
      }
    } else {
      alert('您的浏览器不支持IndexedDB数据库。')
    }
  }

  return {
    beginRoll,
    stopRoll,
    style
  }
}
