import request from '@/utils/request'
export function getSystemSettings() {
  return request({
    url: 'system/getSystemSettings',
    method: 'get'
  })
}

export function changeSystemSettings(object) {
  return request({
    url: 'system/changeSystemSettings',
    method: 'post',
    data: object
  })
}
