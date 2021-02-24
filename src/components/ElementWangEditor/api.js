import request from '@/utils/request'
export function deleteImage(action, params) {
  return request({
    url: action,
    method: 'post',
    data: params
  })
}
