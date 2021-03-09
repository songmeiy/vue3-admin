import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/system/router/getList',
    method: 'get',
    params: params
  })
}

export function doAdd(object) {
  return request({
    url: '/system/router/doAdd',
    method: 'post',
    data: object
  })
}
export function doEdit(data) {
  return request({
    url: '/system/router/doEdit',
    method: 'post',
    data: data
  })
}
export function doDelete(data) {
  return request({
    url: '/system/router/doDelete',
    method: 'post',
    data: data
  })
}
