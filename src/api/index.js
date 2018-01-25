import request from '@/utils/request'
import config from '@/utils/config'

/* 1、登录 */
export function login (data) {
  return request({
    method: 'post',
    url: config.login.url,
    data
  })
}

/* 2、检测登陆状态 */
export function check () {
  return request({
    method: 'get',
    url: config.login.checkUrl
  })
}

/* 3、获取数据 */
export function getData () {
  return request({
    method: 'get',
    url: config.onload.url
  })
}

/* 4、回传抽中数据 */
export function postData (data) {
  return request({
    method: 'post',
    url: config.lottery.url,
    data
  })
}
