import defaultConfig from '@/config'
import { ElLoading, ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import store from '@/store'
import { getToken } from '@/utils/token'
import i18n from '@/utils/i18n'
import { computed } from 'vue'
const { messageDuration } = defaultConfig
const system = computed(() => store.state.settings.system)
/**
 * @description 全局token
 * @author WangZeping zepingwong@gmail.com
 */
export function baseToken() {
  const token = store.state.user.token
  return token || getToken()
}
/**
 * @description 全局加载层
 * @author WangZeping zepingwong@gmail.com
 * @param {*} index
 * @param {*} text
 */
export function baseLoading(index, text = system.value.loadingText) {
  text = messageTranslate(text)
  let loading
  if (!index) {
    loading = ElLoading.service({
      lock: true,
      text: text,
      background: 'hsla(0,0%,100%,.8)'
    })
  } else {
    loading = ElLoading.service({
      lock: true,
      text: text,
      spinner: 'element-loading-type' + index,
      background: 'hsla(0,0%,100%,.8)'
    })
  }
  return loading
}
/**
 * @description 全局多彩加载层
 * @author WangZeping zepingwong@gmail.com
 * @param {*} index
 * @param {*} text
 */
export function baseColorfullLoading(index, text = system.value.loadingText) {
  text = messageTranslate(text)
  let loading
  if (!index) {
    loading = ElLoading.service({
      lock: true,
      text: text,
      spinner: 'dots-loader',
      background: 'hsla(0,0%,100%,.8)'
    })
  } else {
    switch (index) {
        case 1:
          index = 'dots'
          break
        case 2:
          index = 'gauge'
          break
        case 3:
          index = 'inner-circles'
          break
        case 4:
          index = 'plus'
          break
    }
    loading = ElLoading.service({
      lock: true,
      text: text || system.value.loadingText,
      spinner: index + '-loader',
      background: 'hsla(0,0%,100%,.8)'
    })
  }
  return loading
}
/**
 * @description 全局Message
 * @author WangZeping zepingwong@gmail.com
 * @param {*} message
 * @param {*} type
 * @param {*} dangerouslyUseHTMLString
 * @param {*} customClass
 * @param {*} center
 * @param {*} close
 */
export function baseMessage(
  message,
  type,
  dangerouslyUseHTMLString = false,
  customClass = '',
  center = false,
  close = true
) {
  message = messageTranslate(message)
  const duration = close ? messageDuration : 0
  ElMessage({
    showClose: true,
    message: message,
    type: type,
    dangerouslyUseHTMLString: dangerouslyUseHTMLString,
    duration: duration,
    customClass: customClass,
    center: center
  })
}
/**
 * @description 全局Alert
 * @author WangZeping zepingwong@gmail.com
 * @param {*} content
 * @param {*} title
 * @param {*} type success/warning/info/error
 * @param confirmButtonText
 * @param {function} callback
 */
export function baseAlert(
  content,
  title = messageTranslate('message.component.提示'),
  type = 'info',
  confirmButtonText = messageTranslate('message.component.确定'),
  callback = function() {}
) {
  content = messageTranslate(content)
  ElMessageBox.alert(content, title, {
    type: type,
    confirmButtonText: confirmButtonText,
    dangerouslyUseHTMLString: true,
    callback: () => {
      if (callback) {
        callback()
      }
    }
  }).then(() => {})
}
/**
 * @description 全局Confirm
 * @author WangZeping zepingwong@gmail.com
 * @param {*} confirmContent
 * @param {*} confirmTitle
 * @param {*} callback1
 * @param {*} callback2
 * @param {*} confirmButtonText
 * @param {*} cancelButtonText
 * @param {*} type
 */
export function baseConfirm(
  confirmContent,
  confirmTitle = 'message.component.提示',
  callback1 = function() {},
  callback2 = function() {},
  confirmButtonText = 'message.component.确定',
  cancelButtonText = 'message.component.取消',
  type = 'info'
) {
  confirmContent = messageTranslate(confirmContent)
  confirmTitle = messageTranslate(confirmTitle)
  confirmButtonText = messageTranslate(confirmButtonText)
  cancelButtonText = messageTranslate(cancelButtonText)
  ElMessageBox.confirm(confirmContent, confirmTitle, {
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
    closeOnClickModal: false,
    type: type,
    lockScroll: false
  }).then(() => {
    if (callback1) {
      callback1()
    }
  }).catch(() => {
    if (callback2) {
      callback2()
    }
  })
}
/**
 * @description 全局Notification
 * @author WangZeping zepingwong@gmail.com
 * @param {*} message
 * @param {*} title
 * @param {*} type
 * @param {*} position
 * @param {*} close
 * @param onClose 关闭时的回调函数
 * @param onClick 点击时的回调函数
 */
export function baseNotify(message, title, type = 'info', position = 'top-right', close = true, onClose = () => {}, onClick = () => {}) {
  message = messageTranslate(message)
  title = messageTranslate(title)
  const duration = close ? messageDuration : 0
  ElNotification({
    title: title,
    message: message,
    position: position,
    type: type,
    duration: duration,
    onClose: onClose,
    onClick: onClick
  })
}
function messageTranslate(text) {
  return i18n.global.te(text) ? i18n.global.t(text) : text.lastIndexOf('.') === -1 ? text : text.substr(text.lastIndexOf('.') + 1)
}

