import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/system/role/getList',
    method: 'get',
    params: params
  })
}

export function doDelete(data) {
  return request({
    url: '/system/role/doDelete',
    method: 'post',
    data: data
  })
}

export function doAdd(data) {
  return request({
    url: '/system/role/doAdd',
    method: 'post',
    data: data
  })
}

export function doEdit(data) {
  return request({
    url: '/system/role/doEdit',
    method: 'post',
    data: data
  })
}
