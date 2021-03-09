import request from '@/utils/request'

export function bindingEmailSend(data) {
  return request({
    url: 'user/email/bindingEmailSend',
    method: 'post',
    data: data
  })
}

export function bindingEmail(data) {
  return request({
    url: 'user/email/bindingEmail',
    method: 'get',
    params: data
  })
}
