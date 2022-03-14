import Mock from 'mockjs'
import { getToken, setToken, removeToken } from '@/utils/auth'
import config from '../utils/config'

const temp = {
  mta2018: {errorInfo: '登陆成功', result: '1', data: ''},
  err: {errorInfo: '密码错误', result: '0', data: ''},
  check: {errorInfo: '您已经登陆过了', result: '1', data: ''},
  noPer: {errorInfo: '请您先登陆', result: '0', data: ''},
  add: {errorInfo: '成功', result: '1', data: ''}
}
function getQueryString (str, name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = str.match(reg)
  if (r != null) return decodeURIComponent(r[2])
  return ''
}

// 模拟用户数据
const getUserData = function (limit) {
  limit = limit || 100
  const userData = []
  for (let i = 1; i < limit; i++) {
    userData.push(Mock.mock({
      Company: '@city(true)', // 公司名
      CompleteID: '@increment', // ID
      HeadImg: `@image(200x200, @color, #FFF, mock-${i})`, // 微信头像
      Name: '@cname', // 姓名
      Num: `M${i}`, // 工号
      OpenID: '@increment', // 微信ID
      Award: '0' // 奖项，'0'表示未中奖
    }))
  }
  return userData
}

// 奖项类别
const type = [
  {value: '9', label: '特等奖', number: '3'},
  {value: '1', label: '一等奖', number: '5'},
  {value: '2', label: '二等奖', number: '12'},
  {value: '3', label: '三等奖', number: '20'},
  {value: '4', label: '参与奖', number: '28'},
  {value: '5', label: '其他', number: ''}
]

export default {
  postLogin: config => {
    const params = getQueryString(config.body, 'username')
    if (temp[params]) {
      setToken(1)
      return temp[params]
    } else {
      removeToken()
      return temp['err']
    }
  },
  checkLogin: config => {
    const status = getToken()
    if (status) {
      return temp['check']
    } else {
      return temp['noPer']
    }
  },
  getDatas: () => ({
    userData: getUserData(config.onload.limit),
    type
  }),
  postDatas: config => temp['add']
}
