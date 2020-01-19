import Axios from 'axios'

import Cookies from 'js-cookie'

import { TOKEN_KEY } from '@/libs/util'

import _this from '@/main.js'

class httpRequest {
  constructor() {
    this.options = {
      method: '',
      url: ''
    }
  }
  // 请求拦截
  interceptors(instance, options) {
    // 添加请求拦截器
    instance.interceptors.request.use(
      // 在发送请求之前做些什么(如:在请求头中带上token判断登录状态)
      config => {
        if (!config.url.includes('/users')) {
          config.headers['x-access-token'] = Cookies.get(TOKEN_KEY)
        }
        return config
      },
      // 对请求错误做些什么
      error => {
        return Promise.reject(error)
      }
    )
    // 添加响应拦截器
    instance.interceptors.response.use(
      // 对响应成功结果做些什么
      res => {
      },
      // 对响应错误做点什么
      error => {
      }
    )
  }
  // 创建实例
  create(options) {
    let conf = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      timeout: options.timeout || 10000 // 超时时间
    }
    return Axios.create(conf)
  }
  // 合并请求实例
  mergeReqest(instances = []) {
  }
  // 请求实例
  request(options) {
    const instance = this.create(options)
    options = Object.assign({}, options)
    this.interceptors(instance, options)
    return instance(options)
  }
}
export default httpRequest

// 如果管理多个api文件
// 可以创建一个文件,再封装一层,然后多出引用
import HttpRequest from '@/libs/axios'
const axios = new HttpRequest()
export default axios

// api文件中使用
import axios from 'xxxx'
export const getXXXXXData = data => {
  return axios.request({
    url: 'xxxxxxxxxxxxxx', // 请求路径
    data: data, // 请求参数
    method: 'post' // 请求方法
  })
}
