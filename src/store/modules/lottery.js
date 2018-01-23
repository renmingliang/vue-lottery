import { postData } from '../../api'
import * as types from '../mutation-types'
import config from '../../utils/config'

const merge = require('webpack-merge')

// initial data
const state = merge(config.lottery.state, {
  // 单次抽取选项
  timesOptions: [
    {
      value: '1',
      label: '抽1人',
      disabled: false
    }, {
      value: '2',
      label: '抽2人',
      disabled: false
    }, {
      value: '3',
      label: '抽3人',
      disabled: false
    }, {
      value: '4',
      label: '抽4人',
      disabled: false
    }, {
      value: '5',
      label: '抽5人',
      disabled: false
    }
  ]
})

// getters 从state中派生其他状态，应用于更新过滤数据，用于计算属性computed，主要针对动态数据
const getters = {
  download: state => state.download,
  rule: state => state.rule,
  timesOptions: state => state.timesOptions,
  intervalTime: state => state.intervalTime,
  keyBand: state => state.keyBand
}

// mutations，同步数据，用于methods中commit调用
const mutations = {

  // 获取数据
  [types.GET_DATA] (state, payload) {
    state.data = payload.data
  }
}

// actions， 异步操作数据，用于this.$store.dispatch
const actions = {
  /**
   * 回传中奖用户
   * new Promise((resolve, reject) => {})
   * value : payload.value
   * data  : payload.data
   */
  postDatas ({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      const temp = {
        value: payload.value,
        data: payload.data
      }
      postData(temp)
        .then(
          // 这里是处理正确的回调
          res => {
            commit({type: types.POST_DATA, data: res.data})
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
  mutations,
  actions
}
