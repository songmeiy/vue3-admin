import request from '@/utils/request'

export function getIconList(params) {
  return request({
    url: '/develop/Icon/getIconList',
    method: 'get',
    params
  })
}
