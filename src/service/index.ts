import axios from 'axios'

import { ERROR_OK, ERROR_ECONNABORTED, ERROR_NETWORK } from './config'
import instance, { DEFAULT_CONTENT_TYPE } from './instance'
import interceptorsError from './interceptors-error'
import { showError } from '../utils/element-plus'
import { isPlainObj } from '../utils/object'

/**
 * 封装API接口请求方法, 针对aixos实例方法调用
 * @param otpions<Object> 参数<包含axios及自定义两大类参数>
 * options = {
 *  ... aixos相关参数 ...
 *  @param url     <String>   请求地址
 *  @param method  <String>   请求使用的方法，如 GET、POST、PUT、DELETE
 *  @param data    <Object>   请求数据，针对post
 *  @param params  <Object>   请求数据，针对get
 *  ... aixos相关参数 ...
 *
 *  ... 自定义参数（可拓展） ...
 *  @param catchs       <Boolean>    异常处理，接口抛出的异常是否自行处理
 *  由公共方法统一处理展示在控制台 默认 true
 *  @param toast        <Boolean>    接口code异常弹框-仅适用接口请求成功但code码异常
 *  由公共方法统一处理显示给用户 默认 true
 * ... 自定义参数 ...
 * }
 */

const service = function (options): Promise<any> {
  // 兼容get请求直接传入接口地址
  const params = typeof options === 'string' ? { url: options } : options

  // 获取自定义配置参数
  const { catchs = true, toast = true, ...obj } = params

  return new Promise((resolve, reject) => {
    instance(obj)
      .then(async response => {
        // 属于文件下载的请求，直接返回
        const contentType = (response.headers['content-type'] || '').toLowerCase()
        if (!contentType.includes(DEFAULT_CONTENT_TYPE)) return resolve(response)

        // 处理请求完成
        let res = response.data || {}
        // 非json数据 => 需转换
        if (!isPlainObj(res) && response.config.responseType) {
          res = await new Response(res).json()
        }

        // 非成功状态码
        if (res.code !== ERROR_OK && res.code !== 200) {
          // console.error('接口code异常，参数 ===> ', obj)
          // console.error('接口code异常，返回 ===> ', res)
          // 是否弹框展示
          if (toast) {
            showError(res.message || res.msg || '数据返回异常')
          }
          // 自补获异常
          if (catchs) {
            return reject(res)
          }
        }

        // 成功状态码
        return resolve(res)
      })
      .catch(error => {
        // console.error('接口服务异常，参数 ===> ', obj)
        // console.error('接口服务异常，错误 ===> ', error)
        if (axios.isCancel(error)) {
          return reject(error)
        }

        // 过滤自定义配置接口 所有异常
        if (!toast) return reject(error)

        // 请求超时处理
        if (error.code === ERROR_ECONNABORTED) {
          showError('请求超时，请稍候再试')
          return reject(error)
        }

        // 断网处理
        if (error.message === ERROR_NETWORK) {
          showError('网络异常，请稍后再试')
          return reject(error)
        }

        // 异常码拦截消息处理
        interceptorsError(error.response, '')

        return reject(error)
      })
  })
}

export default service
