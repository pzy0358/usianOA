import service from '@/utils/request'

/**
 * 登录接口
 * @param {*} data
 * @returns
 */
export function loginApi(data) {
  return service({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

// 获取用户信息
export function getProfileApi() {
  return service({
    url: '/sys/profile',
    method: 'GET'
  })
}

// 更新密码
export function changePassApi(data) {
  return service({
    url: '/sys/user/updatePass',
    method: 'PUT',
    data
  })
}
