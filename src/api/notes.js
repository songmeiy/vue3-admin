import request from '@/utils/request'

export const createNote = (object) => {
  return request({
    url: 'develop/note/createNote',
    method: 'post',
    data: object
  })
}
export const viewNote = (data) => {
  return request({
    url: 'develop/note/viewNote',
    method: 'post',
    data: data
  })
}

export const getNotes = (params) => {
  return request({
    url: 'develop/note/getNotes',
    method: 'get',
    params
  })
}
export const deleteNotes = (object) => {
  return request({
    url: 'develop/note/deleteNotes',
    method: 'post',
    data: object
  })
}

export const writeHtml = (params) => {
  return request({
    url: 'develop/note/writeHtml',
    method: 'post',
    data: params
  })
}

