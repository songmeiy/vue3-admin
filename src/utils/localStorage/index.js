import { isJson } from '@/utils/validate'

export const getLocalStorage = (key) => {
  const value = localStorage.getItem(key)
  if (isJson(value)) {
    return JSON.parse(value)
  } else {
    return false
  }
}

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value)
}
