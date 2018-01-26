import Mock from 'mockjs'
import lotteryAPI from './lotteryAPI'

// 登录
Mock.mock(/\/zt_lottery\/login/, 'post', lotteryAPI.postLogin)

// 检测登陆
Mock.mock(/\/zt_lottery\/check_login/, 'get', lotteryAPI.checkLogin)

// 获取数据
Mock.mock(/\/zt_lottery\/list_member/, 'get', lotteryAPI.getDatas)

// 回传数据
Mock.mock(/\/zt_lottery\/add/, 'post', lotteryAPI.postDatas)

export default Mock
