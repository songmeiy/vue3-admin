import request from '@/utils/request'
/** *******************************menu**********************************************/
export function getRouterList(params) {
  return request({
    url: '/system/menuManagement/getRouterList',
    method: 'get',
    params
  })
}

export function getMenuComponents() {
  return request({
    url: '/system/menuManagement/getMenuComponents',
    method: 'get'
  })
}
export function addRouter(object) {
  return request({
    url: '/system/menuManagement/addRouter',
    method: 'post',
    data: object
  })
}
export function editRouter(data) {
  return request({
    url: '/system/menuManagement/editRouter',
    method: 'post',
    data: data
  })
}
export function deleteRouter(data) {
  return request({
    url: '/system/menuManagement/deleteRouter',
    method: 'post',
    data: data
  })
}
/** *******************************menu**********************************************/
/** *******************************settings**********************************************/
export function getSystemSettings() {
  return request({
    url: 'system/getSystemSettings',
    method: 'get'
  })
}

export function changeSystemSettings(object) {
  return request({
    url: 'system/changeSystemSettings',
    method: 'post',
    data: object
  })
}
/** *******************************settings**********************************************/
/** *******************************role**********************************************/
export function getRolesList(params) {
  return request({
    url: '/system/rolesManagement/getRolesList',
    method: 'get',
    params: params
  })
}

export function deleteRole(data) {
  return request({
    url: '/system/rolesManagement/deleteRole',
    method: 'post',
    data: data
  })
}

export function addRole(data) {
  return request({
    url: '/system/rolesManagement/addRole',
    method: 'post',
    data: data
  })
}

export function editRole(data) {
  return request({
    url: '/system/rolesManagement/editRole',
    method: 'post',
    data: data
  })
}
/** *******************************role**********************************************/
export function getSearchList() {
  return request({
    url: '/system/search/getSearchList',
    method: 'get'
  })
}
