import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/system/notice/getList',
    method: 'get',
    params: params
  })
}
