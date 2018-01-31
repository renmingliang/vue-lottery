<!-- onload -->
<template>
  <div class="load-container">
    <el-steps :active="isActive" finish-status="success">
      <el-step title="数据获取中..." :description="`共计获取 ${getNum}条`"></el-step>
      <el-step title="存储数据中..." :description="`共计插入 ${storeNum}条`"></el-step>
      <el-step title="缓存头像中..." :description="`共计缓存 ${catchImg}张`"></el-step>
      <el-step :title="`数据校验${step.title}`" :status="step.status" :description="step.description"></el-step>
    </el-steps>
    <div v-if="stop.show" :class="classStop">
      <div class="stop-tips">{{stop.tips}}</div>
      <div class="stop-mask"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'onload',
  data () {
    return {
      request: null, // indexDB对象
      stop: {
        show: false,
        tips: '叁'
      }, // 倒计时文字--叁贰壹
      step: {
        title: '',
        status: 'wait',
        description: '校验数据是否一致'
      }, // 最后一步提示语
      getNum: 0, // 用户数据长度
      storeNum: 0, // 存储数据长度
      catchImg: 0, // 已缓存图片数量
      isActive: 0 // 步骤流程
    }
  },
  created () {
    this.ready()
  },
  mounted () {},
  components: {},
  computed: {
    ...mapState([
      'DBname',
      'DBver',
      'storeName'
    ]),
    ...mapGetters([
      'data'
    ]),
    // 利用计算属性绑定class
    classStop () {
      return {
        'lottery-stop': true,
        'show': this.stop.show
      }
    }
  },
  methods: {
    // 1.初始化
    ready () {
      // 1.0.先删除本地indexDB数据表
      this.deleteDB(this.DBname)

      // 1.1.注意这里采用promise链式语法
      this.$store.dispatch({type: 'getDatas'})
        // 1.1.1获取数据
        .then(() => {
          this.getNum = this.data.userData.length
          if (this.data.hasOwnProperty('userData')) {
            this.isActive = 1
          }
        })
        // 1.1.2.初始化创建本地indexDB数据表
        .then(() => {
          this.initDatabase()
        })
        // 1.1.3.缓存头像
        .then(() => {
          setTimeout(() => {
            this.preLoadImg()
          }, 800)
        })
        // 1.1.4.校验数据--注意这里延时3s后执行
        .then(() => {
          setTimeout(() => {
            this.validateData()
          }, 5000)
        })
    },
    // 2.删除本地表
    deleteDB (name) {
      indexedDB.deleteDatabase(name)
    },
    // 3.初始化表
    initDatabase () {
      if (window.indexedDB) {
        const self = this
        self.request = window.indexedDB.open(self.DBname, self.DBver) // 参数为：数据库名和版本号；数据库存在，则打开它；否则创建。
        self.request.onsuccess = function (event) {
          const mydb = event.target.result
          // 插入用户数据表
          self.insert(mydb, self.storeName.user, self.data.userData).then((res) => {
            self.storeNum = res
            if (self.storeNum !== 0) {
              self.isActive = 2
            }
          })
          // 插入奖项数据表
          self.insert(mydb, self.storeName.award, self.data.type)
        }
        self.request.onerror = function (event) {
          alert(`打开失败,错误号：${event.target.errorCode}`)
        }
        self.request.onupgradeneeded = function (event) {
          const mydb = event.target.result // 获得数据库实例对象
          if (!mydb.objectStoreNames.contains(self.storeName.user)) { // 判断对象存储空间名称是否已经存在
            mydb.createObjectStore(self.storeName.user, {keyPath: 'CompleteID'}) // 创建storeName对象存储空间;指定keyPath选项为id（即主键为id）
          }
          if (!mydb.objectStoreNames.contains(self.storeName.award)) { // 判断对象存储空间名称是否已经存在
            mydb.createObjectStore(self.storeName.award, {autoIncrement: true})
          }
        }
      } else {
        alert('您的浏览器不支持IndexedDB数据库。')
      }
    },
    // 4.插入数据表，修改为Promise链式语法
    insert (db, storeName, tempData) {
      return new Promise((resolve, reject) => {
        let storeNum = 0
        // 使用事务
        const transaction = db.transaction(storeName, // 事务操作的对象存储空间名
          'readwrite') // 事务模式:'readwrite'可读写模式;READ_ONLY只读模式;VERSION_CHANGE版本升级模式;
        // 2.1、当事务中的所有操作请求都被处理完成时触发
        transaction.oncomplete = function (event) {
          resolve(storeNum)
        }
        // 2.2、当事务中出现错误时触发，默认的处理方式为回滚事务；
        transaction.onerror = function (event) {
          alert('数据插入失败')
          reject(event)
        }
        // 2.3、当事务被终止时触发
        transaction.onabort = function (event) { }
        // 2.4、从事务中获得相关的对象存储空间对象
        const objStore = transaction.objectStore(storeName)
        // 2.5、向storeName存储空间加入一个storeName对象，获得request对象用于处理用户对数据库的操作请求(同样拥有onerror，onupgradeneeded，onsuccess事件)
        for (const item of tempData) {
          const request = objStore.add(item)
          request.onsuccess = function (e) {
            storeNum++
          }
        }
      })
    },
    // 5.缓存图片
    preLoadImg () {
      for (const item of this.data.userData) {
        const tempImg = new Image()
        // 图片src地址
        // tempImg.src = 'http://www.jaja365.cn' + item.HeadImg
        tempImg.src = item.HeadImg
        // 图片加载完成
        tempImg.addEventListener('load', () => {
          this.catchImg++
        }, false)
      }
    },
    // 6.数据校验
    validateData () {
      this.isActive = 3
      if (this.catchImg === this.getNum && this.catchImg === this.storeNum) {
        const corStep = {
          title: '成功',
          status: 'success',
          description: '3秒后进入抽奖页面'
        }
        this.step = corStep
        this.stop.show = true
        this.isActive = 4
        let endTime = 3
        const stopTimer = setInterval(() => {
          endTime--
          if (endTime === 2) {
            this.stop.tips = '贰'
          } else if (endTime === 1) {
            this.stop.tips = '壹'
          } else {
            clearInterval(stopTimer)
            this.$router.push({ path: '/lottery' })
          }
        }, 1000)
      } else {
        const errStep = {
          title: '失败',
          status: 'error',
          description: '请重新进入或者 强制刷新本页面'
        }
        this.step = errStep
      }
    }
  },
  watch: {},
  filters: {}
}
</script>

<style lang='less' scoped>
.load-container{
  padding: 50px;
  font-size: 20px;
  .lottery-stop{
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
    transition: all 0.3s;
    &.show{
      display: block;
    }
    .stop-tips{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
      text-align: center;
      font-size: 18rem;
      padding: 0 3rem;
      color: #FD361F;
      font-family: 'STKaiti', 'KaiTi ';
      border: 4px solid #FD361F;
      border-radius: 100%;
    }
    .stop-mask{
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.1);
    }
  }
}
</style>
