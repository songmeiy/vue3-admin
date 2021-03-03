import Mitt from 'mitt'
import {
  baseAlert,
  baseColorfullLoading,
  baseConfirm,
  baseLoading,
  baseMessage, baseNotify,
  baseToken
} from '@/components/ElementPlus'
import ElementPlus from 'element-plus'
import i18n from '@/utils/i18n'
import { translate } from '@/utils/i18n'
// SvgIcon 注册
import SvgIcon from '@/components/ElementSvgIcon'
const req = require.context('../assets/icons', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

// 暴露接口
export default (app) => {
  app.config.globalProperties.$baseToken = baseToken
  app.config.globalProperties.$baseLoading = baseLoading
  app.config.globalProperties.$baseColorfullLoading = baseColorfullLoading
  app.config.globalProperties.$baseMessage = baseMessage
  app.config.globalProperties.$baseAlert = baseAlert
  app.config.globalProperties.$baseConfirm = baseConfirm
  app.config.globalProperties.$baseNotify = baseNotify
  app.config.globalProperties.$translate = translate
  /**
   * @description 表格高度
   * @param {*} formType
   */
  app.config.globalProperties.$baseTableHeight = (formType) => {
    let height = window.innerHeight
    const paddingHeight = 313
    const formHeight = 50
    if (typeof formType === 'number') {
      height = height - paddingHeight - formHeight * formType
    } else {
      height = height - paddingHeight
    }
    return height
  }
  /**
   * @description 全局事件总线
   */
  app.config.globalProperties.$baseEventBus = new Mitt()
  app.use(ElementPlus, {
    size: 'small',
    i18n: i18n.global.t
  })
  app.component('SvgIcon', SvgIcon)
}
