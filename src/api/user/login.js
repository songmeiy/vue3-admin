import request from '@/utils/request'
import { Encrypt } from '@/utils/encrypt'
import defaultConfig from '@/config'
const { loginRSA } = defaultConfig

export async function doLogin(data) {
  if (loginRSA) {
    data = await Encrypt(data)
  }
  return request({
    url: '/user/login',
    method: 'post',
    data: data
  })
}

export function doLogout() {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}

export async function doSocialLogin(data) {
  if (loginRSA) {
    data = await Encrypt(data)
  }
  return request({
    url: '/user/doSocialLogin',
    method: 'post',
    data: data
  })
}
