import request from '@/utils/request'

export const createLog = (object) => {
  return request({
    url: 'develop/update/createLog',
    method: 'post',
    data: object
  })
}
export const viewLog = (data) => {
  return request({
    url: 'develop/update/viewLog',
    method: 'post',
    data: data
  })
}

export const getLogs = (params) => {
  return request({
    url: 'develop/update/getLogs',
    method: 'get',
    params
  })
}
export const deleteLogs = (object) => {
  return request({
    url: 'develop/update/deleteLogs',
    method: 'post',
    data: object
  })
}
export const editLog = (object) => {
  return request({
    url: 'develop/update/editLog',
    method: 'post',
    data: object
  })
}
