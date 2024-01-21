import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.request.use(
  (response) => {
    const { success, message, data } = response.data
    if (success) {
      return data
    } else {
      Message({ type: 'error', message: message })
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    Message({ type: 'error', message: error.message || '请求失败' })
    return Promise.reject(error)
  }
)

export default service
