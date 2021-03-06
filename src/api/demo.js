import request from '@/utils/request'

export function getAreaList(params) {
  return request({
    url: '/demo/area/getList',
    method: 'get',
    params
  })
}

export function doAreaEdit(data) {
  return request({
    url: '/demo/area/doEdit',
    method: 'post',
    data
  })
}

export function doAreaDelete(data) {
  return request({
    url: '/demo/area/doDelete',
    method: 'post',
    data
  })
}

export function getTableList(params) {
  return request({
    url: '/demo/table/getList',
    method: 'get',
    params
  })
}

export function doTableEdit(data) {
  return request({
    url: '/demo/table/doEdit',
    method: 'post',
    data: data
  })
}

export function doTableDelete(data) {
  return request({
    url: '/demo/table/doDelete',
    method: 'post',
    data: data
  })
}

export function getTreeData() {
  return request({
    url: '/demo/table/getTreeData',
    method: 'get'
  })
}
