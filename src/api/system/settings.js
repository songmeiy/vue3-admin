import request from '@/utils/request'

export function getList() {
  return request({
    url: '/system/settings/getList',
    method: 'get'
  })
}
export function doEdit(object) {
  return request({
    url: '/system/settings/doEdit',
    method: 'post',
    data: object
  })
}
