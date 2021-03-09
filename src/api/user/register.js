import request from '@/utils/request'

export function doRegister(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data: data
  })
}
