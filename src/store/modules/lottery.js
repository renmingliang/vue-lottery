import { postData } from '../../api'
import config from '../../utils/config'

// initial data
const state = config.lottery.state

// getters 从state中派生其他状态，应用于更新过滤数据，用于计算属性computed，主要针对动态数据
const getters = {
  style: state => state.style,
  download: state => state.download,
  intervalTime: state => state.intervalTime,
  keyBand: state => state.keyBand
}

// actions， 异步操作数据，用于this.$store.dispatch
const actions = {
  /**
   * 回传中奖用户
   * new Promise((resolve, reject) => {})
   * Num   : payload.Num
   * Award : payload.Award
   */
  postDatas ({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      const temp = {
        Num: payload.Num,
        Award: payload.Award
      }
      console.log(temp)
      postData(temp)
        .then(
          // 这里是处理正确的回调
          res => {
            resolve(res)
          },
          // 这里是处理错误的回调
          err => {
            console.log('fail', err)
            reject(err)
          }
        )
    })
  }
}

export default {
  state,
  getters,
  actions
}
