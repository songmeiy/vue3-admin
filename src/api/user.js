import request from '@/utils/request'
import { Encrypt } from '@/utils/encrypt'
import defaultConfig from '@/config'
const { loginRSA } = defaultConfig
export async function login(data) {
  if (loginRSA) {
    data = await Encrypt(data)
  }
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export async function socialLogin(data) {
  if (loginRSA) {
    data = await Encrypt(data)
  }
  return request({
    url: '/socialLogin',
    method: 'post',
    data
  })
}

export function getMyInfo(params) {
  // 此处为了兼容mock.js使用data传递accessToken，如果使用mock可以走headers
  return request({
    url: 'user/getMyInfo',
    method: 'get',
    params
  })
}

export function logout() {
  return request({
    url: 'user/logout',
    method: 'get'
  })
}

export function register(data) {
  return request({
    url: 'user/register',
    method: 'post',
    data
  })
}

export function editInfo(data) {
  return request({
    url: 'user/editInfo',
    method: 'post',
    data: data
  })
}

export function bindEmailSend(data) {
  return request({
    url: 'user/bindEmailSend',
    method: 'post',
    data: data
  })
}

export function bindEmail(data) {
  return request({
    url: 'user/bindEmail',
    method: 'get',
    data: data
  })
}
