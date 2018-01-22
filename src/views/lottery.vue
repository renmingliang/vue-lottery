<!-- lottery -->
<template>
  <div class="lottery-container">
    <div class="lottery-layout">
      <div class="lottery-main">
        <ul>
          <li class="lottery-item" v-for="(list, index) in rollIdArr" :key="index">
            <div class="lottery-roll">
              <div class="roll-item"><img :src="list.HeadImg"></div>
              <div class="roll-item"><span>{{list.Num}}</span></div>
              <div class="roll-item"><span>{{list.Name}}</span></div>
              <div class="roll-item"><span>{{list.Company}}</span></div>
            </div>
          </li>
        </ul>
        <div class="lottery-btn">
          <div class="btn-func">
            <button @click="beginRoll">开始</button>
            <img src="../assets/images/2017.png">
            <button @click="stopRoll">抽取</button>
          </div>
        </div>
      </div>
      <div class="lottery-prize">
        <el-form :inline="true">
          <el-form-item label="本轮奖项">
            <el-select @change="changeAward" v-model="maxAward" placeholder="请选择抽取奖项">
              <el-option
                v-for="item in awardOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.number | editNumber }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-tag size="large">本轮抽取：{{ maxNum | editNumber }}</el-tag>
          <br>
          <el-form-item label="单次抽取">
            <el-select @change="changeTimes" v-model="maxTimes" placeholder="请选择单次抽取人数">
              <el-option
                v-for="item in timesOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-form-item>
          <el-tag type="success" size="large">本轮累计：{{ `${rollLen}人` }}</el-tag>
        </el-form>
      </div>
      <div class="lottery-rule">
        <img src="../assets/images/QR-code.jpg" alt="QR-code">
        <p>活动规则：<br>关注微信公众号“家家365”<br>回复您的员工编号+姓名<br>（如“M0001234王小明”）完成实名认证<br>收到系统回复后即代表进入抽奖名单中</p>
      </div>
      <div :class="classMusic" @click="toggleMusic">
        <div class="music-btn"></div>
        <audio loop="loop" preload="auto" ref="music">
          <source src="../assets/shiji.mp3" type="audio/mpeg" />
          您的浏览器不支持 audio 标签。
        </audio>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'lottery',
  data () {
    return {
      request: null, // indexDB对象
      awardOptions: [], // 奖项
      userData: [], // 总用户集合
      rollIdArr: [], // 当前抽中集合
      initial: false, // 是否加载数据完成
      maxAward: '', // 本轮奖项类别
      maxNum: '', // 本轮奖项总人数
      rollLen: 0, // 本轮已抽中用户数
      maxTimes: '5', // 单次最大抽取人数
      total: 0, // 累计所有抽中用户数
      isBegin: false, // 是否开始
      timeInterJS: null, // 滚动定时器对象
      musicState: false // 音乐播放状态
    }
  },
  created () {
    this.getData(this.storeName.user, this.userData)
    this.getData(this.storeName.award, this.awardOptions)
  },
  mounted () {
    this.toggleMusic()
    window.addEventListener('keydown', this.keyDown)
  },
  components: {},
  computed: {
    ...mapState([
      'DBname',
      'DBver',
      'storeName'
    ]),
    ...mapGetters([
      'timesOptions',
      'intervalTime',
      'keyBand'
    ]),
    // 利用计算属性绑定class
    classMusic () {
      return {
        'lottery-music': true,
        'stoped': !this.musicState
      }
    }
  },
  methods: {
    // 0.监听键盘输入
    keyDown (e) {
      const keyCode = e.code
      if (keyCode === this.keyBand.start) {
        this.beginRoll()
      } else if (keyCode === this.keyBand.stop) {
        this.stopRoll()
      }
    },
    // 1.开始滚动
    beginRoll () {
      if (!this.isBegin) {
        // 1.0选择抽取奖项
        if (!this.maxAward) {
          alert('请选择抽取奖项')
          return false
        }
        // 1.1本轮抽奖剩余人数
        const tempLast = this.maxNum - this.rollLen
        // 1.1.0若小于单次最大抽奖人数
        if (!!tempLast && tempLast < this.maxTimes) {
          this.maxTimes = tempLast.toString()
        }
        // 1.1.1若已抽完
        if (tempLast === 0) {
          alert('本轮已抽取完毕')
          return false
        }
        // 1.2抽奖池内剩余人数
        const tempRoll = this.userData.length - this.total
        if (tempRoll <= this.maxTimes) {
          alert(`池内剩余总数${tempRoll}，不够本次抽取${this.maxTimes}！`)
          return false
        }
        // 1.3定时器滚动
        this.isBegin = true
        this.timeInterJS = setInterval(this.roll, this.intervalTime)
      }
    },
    // 2.结束抽取
    stopRoll () {
      if (this.isBegin) {
        this.render()
      }
    },
    // 3.抽取结果
    render () {
      clearInterval(this.timeInterJS)
      // 2.0设置抽中人数集合奖项
      this.rollIdArr.map((item) => {
        item.Award = this.maxAward
      })
      // 2.1更新已抽中人数数目
      this.rollLen += this.rollIdArr.length
      // 2.2更新累计抽中人数
      this.total += this.rollIdArr.length
      this.isBegin = false
      console.log(this.rollIdArr)
    },
    // 4.滚动主要函数
    roll () {
      // 4.0先清空抽中集合数组
      this.rollIdArr = []
      // 4.1更新抽中集合
      while (this.rollIdArr.length < this.maxTimes) {
        const rnd = this.getRand()
        const obj = this.userData[rnd]
        if (obj.Award === '0' && !this.findInArr(this.rollIdArr, obj)) {
          this.rollIdArr.push(obj)
        }
      }
    },
    // 5.去除已抽取观众
    findInArr (arr, obj) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i]['CompleteID'] === obj.CompleteID) {
          return true
        }
      }
      return false
    },
    // 6.随机比例返回抽取结果
    getRand () {
      return Math.floor(Math.random() * this.userData.length)
    },
    // 7.修改单次抽取个数
    changeTimes (val) {
      const rnd = this.getRand()
      this.rollIdArr = this.userData.slice(rnd, Number(val) + rnd)
    },
    // 8.修改奖项及本轮人数
    changeAward (val) {
      // 8.0修正本轮已抽取奖项人数
      this.rollLen = 0
      // 8.1本轮奖项总人数
      this.awardOptions.map((item) => {
        if (item.value === val) {
          this.maxNum = item.number ? item.number : '99'
          // 8.1.1本轮总人数小于单次抽取人数
          if (Number(this.maxNum) < Number(this.maxTimes)) {
            this.maxTimes = this.maxNum
            this.changeTimes(this.maxTimes)
          }
        }
      })
      // 8.2单次可供抽取人数
      this.timesOptions.map((item, index) => {
        if (Number(item.value) > Number(this.maxNum)) {
          item.disabled = true
        } else {
          item.disabled = false
        }
      })
    },
    // 9.切换音乐播放状态
    toggleMusic () {
      this.musicState = !this.musicState
      if (this.musicState) {
        this.$refs.music.play()
      } else {
        this.$refs.music.pause()
      }
    },
    // 10.获取所有用户数据
    getData (storeName, tempData) {
      if (window.indexedDB) {
        const self = this
        self.request = window.indexedDB.open(self.DBname, self.DBver)
        self.request.onsuccess = function (event) {
          const mydb = event.target.result
          const trans = mydb.transaction(storeName, 'readonly')
          trans.oncomplete = function (event) {
            self.initial = true
          }
          trans.onerror = function (event) {
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
        self.request.onerror = function (event) {
          alert(`打开失败,错误号：${event.target.errorCode}`)
        }
      } else {
        alert('您的浏览器不支持IndexedDB数据库。')
      }
    }
  },
  watch: {
    // 监听是否读取数据完成，并初始化显示抽取集合
    initial (val) {
      this.rollIdArr = this.userData.slice(0, this.maxTimes)
    }
  },
  filters: {
    // 考虑其他奖项抽取人数未定，默认可抽99人
    editNumber (val) {
      if (val && val !== '99') {
        return `${val}人`
      } else {
        return `自选`
      }
    }
  }
}
</script>

<style lang="less">
.el-form-item__label{
  color: gold;
}
</style>

<style lang='less' scoped>
@keyframes rotateMusic{
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
.lottery-container{
  height: 100%;
  background-image: url(../assets/images/background.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  position: relative;
  .lottery-layout{
    position: relative;
    width: 100%;
    height: 100%;
    .lottery-main{
      width: 64%;
      position: absolute;
      left: 50%;
      top: 23%;
      transform: translate3d(-50%,0,0);
      z-index: 2;
      ul{
        min-height: 460px;
      }
      .lottery-item{
        height: 88px;
        line-height: 88px;
        margin-top: 5px;
        text-align: center;
        background-image: url(../assets/images/roll.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        overflow: hidden;
        position: relative;
        .lottery-roll{
          display: flex;
          .roll-item{
            width: 20%;
            font-size: 36px;
            display: flex;
            justify-content: center;
            align-items: center;
            &:last-child{
              width: 40%;
            }
            img{
              border-radius: 50%;
              height: 65px;
              border: 1px solid #ccc;
            }
          }
        }
      }
    }
    .lottery-btn{
      margin-top: 5%;
      .btn-func{
        display: flex;
        justify-content: center;
        img{
          margin: 0 7%;
        }
        button{
          background-image: url(../assets/images/button.png);
          background-repeat: no-repeat;
          background-size: cover;
          background-position-x: -4px;
          color: #fff;
          padding: 10px 36px;
          font-size: 26px;
          border-radius: 7px;
          outline: none;
          cursor: pointer;
          &:hover{
            color: rgba(227,183,27,0.9);
          }
        }
      }
    }
    .lottery-music{
      position: absolute;
      left: 1%;
      bottom: 5%;
      cursor: pointer;
      .music-btn{
        width: 3em;
        height: 3em;
        background: url(../assets/images/music.png) no-repeat center center;
        background-size: contain;
        animation: rotateMusic 1.2s linear infinite;
      }
      &.stoped{
        .music-btn{
          animation-play-state: paused;
        }
      }
    }
    .lottery-prize{
      position: absolute;
      left: 5%;
      bottom: 8%;
      color: gold;
      font-size: 18px;
      z-index: 1;
    }
    .lottery-rule{
      position: absolute;
      right: -4%;
      bottom: 9%;
      color: gold;
      z-index: 1;
      img{
        width: 18%;
        float: left;
        margin-right: 2%;
      }
      p{
        overflow: hidden;
        font-size: 18px;
        line-height: 1.4;
      }
    }
  }
}
</style>
