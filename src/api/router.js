import request from '@/utils/request'

export function getRouterList(params) {
  return request({
    url: 'system/menu/getMenuList',
    method: 'get',
    params
  })
}
