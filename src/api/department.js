import service from '@/utils/request'

// 获取部门列表
export function getDepartmentApi() {
  return service({
    url: '/company/department',
    method: 'GET'
  })
}

// 获取部门负责人数据
export function getManagerApi() {
  return service({
    url: '/sys/user/simple',
    method: 'GET'
  })
}

// 新增组织
export function addDepartmentApi(data) {
  return service({
    url: '/company/department',
    method: 'POST',
    data
  })
}

// 获取部门详情
export function getDepartmentDetailApi(id) {
  return service({
    url: `/company/department/${id}`,
    method: 'GET'
  })
}
/**
 * 修改-部门详情
 * @param {*} id
 * @param {*} data
 * @returns
 */
export function updateDepartmentApi(id, data) {
  console.log('id=>', id)
  return service({
    url: `/company/department/${id}`,
    method: 'PUT',
    data
  })
}

// 删除部门
export function deleteDepartmentApi(id) {
  return service({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}
