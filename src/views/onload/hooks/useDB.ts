import { toRaw } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { useOnloadStore } from '@/store/modules/onload'
import { storeToRefs } from 'pinia'

export const useDB = function () {
  const appStore = useAppStore()
  const { state: appState } = storeToRefs(appStore)

  const onloadStore = useOnloadStore()
  const { data } = storeToRefs(onloadStore)

  // 删除本地表
  const deleteDB = function () {
    window.indexedDB && window.indexedDB.deleteDatabase(appState.value.DBname)
  }

  // 插入数据表，修改为Promise链式语法
  const insertDB = function (db, storeName, tempData): Promise<any> {
    return new Promise((resolve, reject) => {
      let sn = 0
      // 使用事务
      const transaction = db.transaction(
        storeName, // 事务操作的对象存储空间名
        'readwrite'
      ) // 事务模式:'readwrite'可读写模式;READ_ONLY只读模式;VERSION_CHANGE版本升级模式;
      // 2.1、当事务中的所有操作请求都被处理完成时触发
      transaction.oncomplete = function () {
        resolve(sn)
      }
      // 2.2、当事务中出现错误时触发，默认的处理方式为回滚事务；
      transaction.onerror = function (event) {
        reject(event)
      }
      // 2.3、当事务被终止时触发
      transaction.onabort = function () {}
      // 2.4、从事务中获得相关的对象存储空间对象
      const objStore = transaction.objectStore(storeName)
      // 2.5、向storeName存储空间加入一个storeName对象，获得request对象用于处理用户对数据库的操作请求(同样拥有onerror，onupgradeneeded，onsuccess事件)
      for (const item of tempData) {
        // !!!注意是原始值
        const request = objStore.add(toRaw(item))
        request.onsuccess = function () {
          sn++
        }
        request.onerror = function (error) {
          reject(error)
        }
      }
    })
  }

  // 初始化表
  const initDB = function (): Promise<[any, any]> {
    return new Promise((resolve, reject) => {
      if (window.indexedDB) {
        const requestDB = window.indexedDB.open(appState.value.DBname, appState.value.DBver) // 参数为：数据库名和版本号；数据库存在，则打开它；否则创建。
        requestDB.onsuccess = function (event) {
          const mydb = (event.target as any).result
          Promise.all([
            // 插入奖项数据表
            insertDB(mydb, appState.value.storeName.award, data.value?.type),
            // 插入用户数据表
            insertDB(mydb, appState.value.storeName.user, data.value?.userData)
          ])
            .then(res => {
              resolve(res)
            })
            .catch(err => {
              reject(err)
            })
        }
        requestDB.onerror = function (event) {
          reject(event)
        }
        requestDB.onupgradeneeded = function (event) {
          const mydb = (event.target as any).result // 获得数据库实例对象
          if (!mydb.objectStoreNames.contains(appState.value.storeName.user)) {
            // 判断对象存储空间名称是否已经存在
            mydb.createObjectStore(appState.value.storeName.user, { keyPath: 'CompleteID' }) // 创建storeName对象存储空间;指定keyPath选项为id（即主键为id）
          }
          if (!mydb.objectStoreNames.contains(appState.value.storeName.award)) {
            // 判断对象存储空间名称是否已经存在
            mydb.createObjectStore(appState.value.storeName.award, { autoIncrement: true })
          }
        }
      } else {
        alert('您的浏览器不支持IndexedDB数据库。')
        reject()
      }
    })
  }

  return {
    deleteDB,
    initDB
  }
}
