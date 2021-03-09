import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/system/search/getList',
    method: 'get',
    params: params
  })
}
