import request from '@/utils/request'
export function doAdd(data) {
  return request({
    url: '/demo/form/doAdd',
    method: 'post',
    data: data
  })
}

