import service from '@/utils/request'

// 角色管理数据
export function getRoleListApi(params) {
  return service({
    url: '/sys/role',
    method: 'GET',
    params
  })
}

// 新增员工
export function addRoleApi(data) {
  return service({
    url: '/sys/role',
    method: 'POST',
    data
  })
}

// 删除
export function delRoleApi(id) {
  return service({
    url: `/sys/role/${id}`,
    method: 'DELETE'
  })
}
