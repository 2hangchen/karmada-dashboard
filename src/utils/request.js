import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken, removeUserInfo, removeToken } from '@/utils/auth'
import vueMain from '@/main.js'

// 创建axios 实例
const service = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  baseURL: '/',
  withCredentials: true,
  timeout: 10000 // 请求超时时间
})
// request 拦截器
service.interceptors.request.use(
  configO => {
    const config = configO
    if (store.getters.token && config.url.indexOf('/v1/') !== 0) {
      config.headers.Authorization = `Bearer ${getToken()}`
    }
    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    // }
    if (config.method === 'post') {
      // config.data = qs.stringify(config.data);
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    const res = response.data
    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    // }
    if (
      (response.status !== 200 && response.status !== 201) ||
      (res.code && res.code !== 200)
    ) {
      if (res.code === 401) {
        removeToken()
        removeUserInfo()
        vueMain.$router.push({
          path: '/login'
        })
      }
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 10 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    }
    return res
  },
  error => {
    console.log(`接口请求失败：${error}`)
    Message({
      message: `接口请求失败：${error}`,
      type: 'error',
      duration: 10 * 1000
    })
    return Promise.reject(error)
  }
)
export default service
