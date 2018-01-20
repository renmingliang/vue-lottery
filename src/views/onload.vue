<!-- onload -->
<template>
  <div class="load-container">
    <span>数据获取中......</span><br>
    <span v-show="msg1">共获取数据 <span>{{getNum}}</span> 条</span><br>
    <br>
    <span v-show="step2">创建存储空间并存储数据中......</span><br>
    <span v-show="msg2">数据插入成功，共存储数据 <span>{{storeNum}}</span> 条</span><br>
    <br>
    <span v-show="step3">读取微信头像地址中......</span><br>
    <span v-show="msg3">正在缓存头像图片<span >{{catchImg}}</span>条</span><br>
    <br>
    <span v-show="msg4">数据校验成功 {{hrefTime}}秒 后进入抽奖</span>
  </div>
</template>

<script>
export default {
  name: 'onload',
  data () {
    return {
      msg1: false,
      step2: false,
      msg2: false,
      step3: false,
      msg3: false,
      msg4: false,
      hrefTime: 3, // 跳转等待时间
      request: null,
      DBname: 'lottery2018',
      DBver: '2',
      data: {
        userData: [
          {Company: '公司测1', CompleteID: '1', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/1.jpg', Name: '测1', Num: 'M1', OpenID: '1', Award: '0'},
          {Company: '公司测13', CompleteID: '13', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/13.jpg', Name: '测13', Num: 'M13', OpenID: '13', Award: '0'},
          {Company: '公司测34', CompleteID: '34', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/34.jpg', Name: '测34', Num: 'M34', OpenID: '34', Award: '0'},
          {Company: '公司测10', CompleteID: '10', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/10.jpg', Name: '测10', Num: 'M10', OpenID: '10', Award: '0'},
          {Company: '公司测77', CompleteID: '77', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/77.jpg', Name: '测77', Num: 'M77', OpenID: '77', Award: '0'},
          {Company: '公司测55', CompleteID: '55', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/55.jpg', Name: '测55', Num: 'M55', OpenID: '55', Award: '0'},
          {Company: '公司测111', CompleteID: '111', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/111.jpg', Name: '测111', Num: 'M111', OpenID: '111', Award: '0'},
          {Company: '公司测433', CompleteID: '433', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/433.jpg', Name: '测433', Num: 'M433', OpenID: '433', Award: '0'},
          {Company: '公司测323', CompleteID: '323', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/323.jpg', Name: '测323', Num: 'M323', OpenID: '323', Award: '0'},
          {Company: '公司测63', CompleteID: '63', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/63.jpg', Name: '测63', Num: 'M63', OpenID: '63', Award: '0'},
          {Company: '公司测954', CompleteID: '954', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/954.jpg', Name: '测954', Num: 'M954', OpenID: '954', Award: '0'},
          {Company: '公司测154', CompleteID: '154', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/154.jpg', Name: '测154', Num: 'M154', OpenID: '154', Award: '0'},
          {Company: '公司测121', CompleteID: '121', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/121.jpg', Name: '测121', Num: 'M121', OpenID: '121', Award: '0'},
          {Company: '公司测2325', CompleteID: '2325', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/2325.jpg', Name: '测2325', Num: 'M2325', OpenID: '2325', Award: '0'},
          {Company: '公司测2323', CompleteID: '2323', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/2323.jpg', Name: '测2323', Num: 'M2323', OpenID: '2323', Award: '0'},
          {Company: '公司测2479', CompleteID: '2479', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/2479.jpg', Name: '测2479', Num: 'M2479', OpenID: '2479', Award: '0'},
          {Company: '公司测1346', CompleteID: '1346', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/1346.jpg', Name: '测1346', Num: 'M1346', OpenID: '1346', Award: '0'},
          {Company: '公司测2133', CompleteID: '2133', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/2133.jpg', Name: '测2133', Num: 'M2133', OpenID: '2133', Award: '0'},
          {Company: '公司测1232', CompleteID: '1232', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/1232.jpg', Name: '测1232', Num: 'M1232', OpenID: '1232', Award: '0'},
          {Company: '公司测53', CompleteID: '53', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/53.jpg', Name: '测53', Num: 'M53', OpenID: '53', Award: '0'},
          {Company: '公司测23', CompleteID: '23', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/23.jpg', Name: '测23', Num: 'M23', OpenID: '23', Award: '0'},
          {Company: '公司测964', CompleteID: '964', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/964.jpg', Name: '测964', Num: 'M964', OpenID: '964', Award: '0'},
          {Company: '公司测673', CompleteID: '673', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/673.jpg', Name: '测673', Num: 'M673', OpenID: '673', Award: '0'},
          {Company: '公司测924', CompleteID: '924', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/924.jpg', Name: '测924', Num: 'M924', OpenID: '924', Award: '0'},
          {Company: '公司测803', CompleteID: '803', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/803.jpg', Name: '测803', Num: 'M803', OpenID: '803', Award: '0'},
          {Company: '公司测20', CompleteID: '20', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/20.jpg', Name: '测20', Num: 'M20', OpenID: '20', Award: '0'},
          {Company: '公司测3', CompleteID: '3', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/3.jpg', Name: '测3', Num: 'M3', OpenID: '3', Award: '0'},
          {Company: '公司测83', CompleteID: '83', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/83.jpg', Name: '测83', Num: 'M83', OpenID: '83', Award: '0'},
          {Company: '公司测8', CompleteID: '8', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/8.jpg', Name: '测8', Num: 'M8', OpenID: '8', Award: '0'},
          {Company: '公司测91', CompleteID: '91', HeadImg: 'http://test.baoxianadmin.com/static/m/images/headImage/91.jpg', Name: '测91', Num: 'M91', OpenID: '91', Award: '0'}
        ],
        type: [
          {value: '9', label: '特等奖', number: '3'},
          {value: '1', label: '一等奖', number: '5'},
          {value: '2', label: '二等奖', number: '12'},
          {value: '3', label: '三等奖', number: '20'},
          {value: '4', label: '参与奖', number: '28'},
          {value: '5', label: '其他', number: ''}
        ]
      },
      getNum: 0, // 用户数据长度
      storeNum: 0, // 存储数据长度
      catchImg: 0, // 已缓存图片数量
      timeout: 1000 // 定时器间隔
    }
  },
  created () {
    this.ready()
  },
  mounted () {},
  components: {},
  computed: {},
  methods: {
    // 1.初始化
    ready () {
      // 1.1.先删除本地indexDB数据表
      this.deleteDB(this.DBname)

      // 1.2.获取数据
      console.log(this.data.userData)
      this.getNum = this.data.userData.length
      this.msg1 = true

      // 1.3.初始化创建本地indexDB数据表
      this.initDatabase()

      // 1.4.缓存头像
      this.preLoadImg()
    },
    // 2.删除本地表
    deleteDB (name) {
      indexedDB.deleteDatabase(name)
    },
    // 3.初始化表
    initDatabase () {
      if (window.indexedDB) {
        const self = this
        self.step2 = true
        self.request = window.indexedDB.open(self.DBname, self.DBver) // 参数为：数据库名和版本号；数据库存在，则打开它；否则创建。
        self.request.onsuccess = function (event) {
          const mydb = event.target.result
          // 插入用户数据表
          self.insert(mydb, 'complete', self.data.userData).then((res) => {
            self.storeNum = res
          })
          // 插入奖项数据表
          self.insert(mydb, 'type', self.data.type)
        }
        self.request.onerror = function (event) {
          alert(`打开失败,错误号：${event.target.errorCode}`)
        }
        self.request.onupgradeneeded = function (event) {
          const mydb = self.request.result // 获得数据库实例对象
          if (!mydb.objectStoreNames.contains('complete')) { // 判断对象存储空间名称是否已经存在
            mydb.createObjectStore('complete', {keyPath: 'CompleteID'}) // 创建storeName对象存储空间;指定keyPath选项为id（即主键为id）
          }
          mydb.createObjectStore('type', {autoIncrement: true})
          self.store1 = true
        }
      } else {
        alert('您的浏览器不支持IndexedDB数据库。')
      }
    },
    // 4.插入数据表，修改为Promise链式语法
    insert (db, storeName, tempData) {
      return new Promise((resolve, reject) => {
        const self = this
        let storeNum = 0
        // 使用事务
        const transaction = db.transaction(storeName, // 事务操作的对象存储空间名
          'readwrite') // 事务模式:'readwrite'可读写模式;READ_ONLY只读模式;VERSION_CHANGE版本升级模式;
        // 2.1、当事务中的所有操作请求都被处理完成时触发
        transaction.oncomplete = function (event) {
          self.msg2 = true
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
      this.step3 = true
      this.msg3 = true
      for (const item of this.data.userData) {
        const tempImg = new Image()
        // 图片加载完成
        tempImg.addEventListener('load', () => {
          this.catchImg++
          if (this.catchImg === this.getNum && this.catchImg === this.storeNum) {
            console.log('进入')
            this.msg4 = true
            const hrefTimer = setInterval(() => {
              this.hrefTime--
              if (this.hrefTime < 0) {
                clearInterval(hrefTimer)
                this.$router.push({ path: '/lottery' })
              }
            }, this.timeout)
          }
        }, false)
        // 图片src地址
        tempImg.src = item.HeadImg
      }
    }
  },
  watch: {},
  filters: {}
}
</script>

<style lang='less' scoped>
.load-container{
  font-size: 20px;
}
</style>
