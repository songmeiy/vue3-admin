import { createI18n, useI18n } from 'vue-i18n'
import enLocale from 'element-plus/lib/locale/lang/en'
import zhLocale from 'element-plus/lib/locale/lang/zh-cn'
import en from './lang/en'
import zh from './lang/zh'
import { isJson } from '@/utils/validate'

const messages = {
  [enLocale.name]: {
    // el 这个属性很关键，一定要保证有这个属性，
    el: enLocale.el,
    // 定义您自己的字典，但是请不要和 `el` 重复，这样会导致 ElementPlus 内部组件的翻译失效.
    message: en
  },
  [zhLocale.name]: {
    el: zhLocale.el,
    // 定义您自己的字典，但是请不要和 `el` 重复，这样会导致 ElementPlus 内部组件的翻译失效.
    message: zh
  },
  testLocale: {
    el: {}
    // 没有定义 message 字段，会 fallback 回到 en 去, fallbackLocale 的定义在下方 👇
  }
}
const getLocalStorage = (key) => {
  const value = localStorage.getItem(key)
  if (isJson(value)) {
    return JSON.parse(value)
  } else {
    return false
  }
}
const { i18nLanguage } = getLocalStorage('language')
const i18n = createI18n({
  locale: i18nLanguage || zhLocale.name,
  fallbackLocale: zhLocale.name,
  globalInjection: true, // 全局挂载，ctx.$t
  legacy: false,
  messages
})

/**
 * @author WangZeping zepingwong@gmail.com
 * @param title
 * @param key
 * @returns {string|*}
 */
export function translate(title, key) {
  const { t, te } = useI18n()
  if (te(`message.${title}.${key}`)) return t(`message.${title}.${key}`)
  return key
}

export default i18n
