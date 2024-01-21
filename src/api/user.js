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
