import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/demo/area/getList',
    method: 'get',
    params
  })
}

export function doEdit(data) {
  return request({
    url: '/demo/area/doEdit',
    method: 'post',
    data
  })
}

export function doDelete(data) {
  return request({
    url: '/demo/area/doDelete',
    method: 'post',
    data
  })
}
