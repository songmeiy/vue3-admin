import request from '@/utils/request'

export function getList() {
  return request({
    url: '/system/about/getList',
    method: 'get'
  })
}
