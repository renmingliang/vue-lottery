import request from '@/utils/request'
import config from '@/utils/config'

/* 1、登录 */
export function login (data) {
  console.log(`提交数据：${JSON.stringify(data)}`)
  return request({
    method: 'post',
    url: config.login.url,
    data
  })
}

/* 2、获取数据 */
export function getData () {
  return request({
    method: 'get',
    url: config.onload.url
  })
}

/* 3、回传抽中数据 */
export function postData (data) {
  return request({
    method: 'post',
    url: config.lottery.url,
    data
  })
}
