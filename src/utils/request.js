import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from 'vue-router'

// axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 注入token
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
    if (success) {
      return data
    } else {
      Message({ type: 'error', message: message })
      return Promise.reject(new Error(message))
    }
  },
  async(error) => {
    if (error.response.status === 401) {
      Message({ type: 'warning', message: 'token超时了' })
      // 清空token 与 用户信息
      await store.dispatch('user/logout')
      // 跳转到登录页
      router.push('/login')
      // 返回错误的信息结果
      return Promise.reject(error)
    }
    Message({ type: 'error', message: error.message || '请求失败' })
    return Promise.reject(error)
  }
)

export default service
