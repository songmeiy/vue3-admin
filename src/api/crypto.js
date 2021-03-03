import request from '@/utils/request'

export function getPublicKey() {
  return request({
    url: '/crypto/publicKey',
    method: 'get'
  })
}
