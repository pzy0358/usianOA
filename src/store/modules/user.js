import { loginApi } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
const state = {
  token: getToken()
}

const mutations = {
  // 设置token
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  // 删除token
  removeToken(state) {
    state.token = null
    removeToken()
  }
}

const actions = {
  // 登录方法
  async login(context, payload) {
    delete payload.isAgree
    const token = await loginApi(payload)
    context.commit('setToken', token)
  }
}

export default {
  namespace: true,
  state,
  mutations,
  actions
}
