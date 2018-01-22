import { getData } from '../../api'
import * as types from '../mutation-types'

// initial data
const state = {
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
  }, // 抽奖数据
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
