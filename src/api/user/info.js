import request from '@/utils/request'

export function getMyInfo(params) {
  return request({
    url: '/user/info/getMyInfo',
    method: 'get',
    params: params
  })
}

export function doEdit(data) {
  return request({
    url: '/user/info/doEdit',
    method: 'post',
    data: data
  })
}
