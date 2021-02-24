// 为了封装而选择了原生的XMLHttpRequest请求提交
/**
 * @description ElementCropper 提交请求
 * @param action 提交地址
 * @param files 文件
 * @param data 额外参数
 * @param headers 请求头
 * @param name 参数名称
 * @param emit 回调方法
 */
export function request(action, files, data = {}, headers = {}, name, emit = () => {}) {
  const formData = new FormData()
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key])
  })
  formData.append(name, files)
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        emit('success', xhr.response)
        return xhr.response
      } else {
        emit('fail', xhr.response)
        return xhr.response
      }
    }
  }
  xhr.open('POST', action, true)
  Object.keys(headers).forEach((key) => {
    xhr.setRequestHeader(key, headers[key])
  })
  xhr.responseType = 'json'
  xhr.send(formData)
}
