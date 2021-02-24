import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/demo/table/getList',
    method: 'get',
    params
  })
}

export function doEdit(data) {
  return request({
    url: '/demo/table/doEdit',
    method: 'post',
    data: data
  })
}

export function doDelete(data) {
  return request({
    url: '/demo/table/doDelete',
    method: 'post',
    data: data
  })
}
