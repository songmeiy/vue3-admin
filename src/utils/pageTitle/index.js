import i18n from '@/utils/i18n'
import store from '@/store'
import { computed } from 'vue'
const system = computed(() => store.state.settings.system)
/**
 * @description 设置标题
 * @param pageTitle
 * @returns {string}
 */
export default function getPageTitle(pageTitle) {
  if (i18n.global.te(`message.router.${pageTitle}`)) {
    pageTitle = i18n.global.t(`message.router.${pageTitle}`)
  }
  let newTitles = []
  if (pageTitle) newTitles.push(pageTitle)
  if (system.value.websiteTitle) newTitles.push(system.value.websiteTitle)
  if (system.value.titleReverse) newTitles = newTitles.reverse()
  document.title = newTitles.join(system.value.titleSeparator)
}
