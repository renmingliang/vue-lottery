import { getData } from '../../api'
import * as types from '../mutation-types'

// initial data
const state = {
  // 抽奖数据
  data: {},
  step: {
    title: '',
    status: 'wait',
    description: '校验数据是否一致'
  } // 最后一步提示语
}

// getters 从state中派生其他状态，应用于更新过滤数据，用于计算属性computed，主要针对动态数据
const getters = {
  data: state => state.data,
  step: state => state.step
}

// mutations，同步数据，用于methods中commit调用
const mutations = {

  // 获取数据
  [types.GET_DATA] (state, payload) {
    state.data = payload.data
  },

  // 切换最终步骤状态
  [types.TOGGLE_STEP] (state, payload) {
    state.step = payload.data
  }
}

// actions， 异步操作数据，用于this.$store.dispatch
const actions = {
  /**
   * 获取抽奖数据
   * new Promise((resolve, reject) => {})
   */
  getDatas ({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      getData()
        .then(
          // 这里是处理正确的回调
          res => {
            commit({type: types.GET_DATA, data: res.data})
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
