import Clipboard from 'clipboard'
import { baseMessage } from '@/components/ElementPlus'

/**
 * @author WangZeping zepingwong@gmail.com
 * @description 复制成功消息
 * @param text
 */
function clipboardSuccess(text) {
  baseMessage(
    `复制  ${text}  成功`,
    'success',
    false,
    'element-hey-message-success'
  )
}
/**
 * @author WangZeping zepingwong@gmail.com
 * @description 复制失败消息
 * @param text
 */
function clipboardError(text) {
  baseMessage(
    `复制  ${text}  失败`,
    'error',
    false,
    'element-hey-message-error'
  )
}

/**
 * @author WangZeping zepingwong@gmail.com
 * @description 复制数据
 * @param text
 * @param event
 */
export default function handleClipboard(text, event) {
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  clipboard.on('success', () => {
    clipboardSuccess(text)
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError(text)
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
