import request from '@/utils/request'

export function getList() {
  return request({
    url: '/demo/tree/getList',
    method: 'get'
  })
}

export function doEdit(data) {
  return request({
    url: '/demo/tree/doEdit',
    method: 'post',
    data: data
  })
}

export function doDelete(data) {
  return request({
    url: '/demo/tree/doDelete',
    method: 'post',
    data: data
  })
}
