import axios from 'axios'
// import QS from 'qs'
import { Message } from 'element-ui'
import router from '../router'
import currentScience from '../config'

axios.defaults.timeout = 200000
axios.defaults.baseURL = currentScience.baseUrl
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.headers.post['Content-type'] = 'application/x-www-form-urlcode;chatset=UTF-8'
axios.interceptors.request.use(
  config => {
    if (config.headers['Content-Type'] && config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data'
    }
    // const token = localStorage.getItem('token')
    // token && (config.headers.Authorization = token)
    return config
  },
  error => {
    return Promise.error(error)
  }
)

axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    if (JSON.stringify(error.message).includes('timeout')) {
      Message.error('请求超时，请稍后再试！')
    } else {
      if (error.response === undefined) {
        Message.error('请求失败，请联系管理员！')
      } else {
        if (error.response.status) {
          switch (error.response.status) {
            case 401:
              router.replace({
                path: '/login',
                query: { redirect: router.currentRoute.fullPath }
              })
              break
            case 403:
              Message.error('登录过期，请重新登录！')
              localStorage.removeItem('token')
              setTimeout(() => {
                router.replace({
                  path: '/login',
                  query: {
                    redirect: router.currentRoute.fullPath
                  }
                })
              }, 1000)
              break
            case 404:
              Message.error('网络请求不存在！')
              break
            case 500:
              Message.error('服务器异常！')
              break
            default:
              Message.error(error.response.data.message)
              break
          }
          return Promise.reject(error.response)
        } else {
          Message.error('请求失败，请稍后再试！')
        }
      }
    }
  }
)

/**
 * get方法，对应get请求
 * @param {String} url 请求的url地址
 * @param {Object} params 请求时携带的参数
 */

export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
/**
 * get方法，对应get请求
 * @param {String} url 请求的url地址
 * @param {Object} params 请求时携带的参数
 */

export function getBlob (url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
        responseType: 'blob'
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url  请求的url地址
 * @param {Object} params 请求时携带的参数  json
 */

export function post (url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
