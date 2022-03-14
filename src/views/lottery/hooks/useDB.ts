import { onMounted, ref } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { storeToRefs } from 'pinia'

export const useDB = function () {
  const appStore = useAppStore()
  const { state: appState } = storeToRefs(appStore)

  const initial = ref(false) // 是否加载数据完成
  const userData = ref([]) // 总用户集合
  const awardOptions = ref([]) // 奖项

  // 获取所有用户数据
  const getData = function (storeName, tempData) {
    if (window.indexedDB) {
      const requestDB = window.indexedDB.open(appState.value.DBname, appState.value.DBver)
      requestDB.onsuccess = function (event) {
        const mydb = (event.target as any).result
        const trans = mydb.transaction(storeName, 'readonly')
        trans.oncomplete = function () {
          initial.value = true
        }
        trans.onerror = function () {
          alert('数据获取失败')
        }
        const objStore = trans.objectStore(storeName)
        const request = objStore.openCursor()
        request.onsuccess = function (e) {
          const cursor = e.target.result
          if (cursor) {
            const obj = cursor.value
            tempData.push(obj)
            cursor.continue()
          }
        }
      }
      requestDB.onerror = function (event) {
        alert(`打开失败,错误号：${(event.target as any).errorCode}`)
      }
    } else {
      alert('您的浏览器不支持IndexedDB数据库。')
    }
  }

  onMounted(() => {
    getData(appState.value.storeName.user, userData.value)
    getData(appState.value.storeName.award, awardOptions.value)
  })

  return {
    initial,
    userData,
    awardOptions
  }
}
