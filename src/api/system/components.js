import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/system/components/getList',
    method: 'get',
    params: params
  })
}
