/**
 * @description 所有全局配置的状态管理，如无必要请勿修改
 */
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage'
import defaultConfig from '@/config'
import { baseMessage } from '@/components/ElementPlus'
import i18n from '@/utils/i18n'
import { getList, doEdit } from '@/api/system/settings'

const {
  columnStyle,
  fixedHeader,
  language,
  layout,
  websiteLogo,
  showFullScreen,
  showLanguage,
  showNotice,
  showProgressBar,
  showRefresh,
  showSearch,
  showTabs,
  showTabsBarIcon,
  showTheme,
  showFooter,
  showBreadcrumb,
  showThemeSetting,
  showBreadcrumbIcon,
  tabsBarStyle,
  themeName,
  websiteTitle,
  uniqueOpened,
  openFirstMenu,
  titleReverse,
  allowRegister,
  loginRSA,
  supportVisit,
  titleSeparator,
  copyright,
  loginInterception,
  routesWhiteList,
  recordRoute,
  loadingText,
  messageDuration,
  showClean,
  rolesControl
} = defaultConfig
const { collapse } = getLocalStorage('collapse')
const { i18nLanguage } = getLocalStorage('language')
const defaultTheme = {
  layout,
  themeName,
  columnStyle,
  fixedHeader,
  showProgressBar,
  showTabs,
  tabsBarStyle,
  showTabsBarIcon,
  showLanguage,
  showRefresh,
  showSearch,
  showTheme,
  showNotice,
  showFooter,
  showBreadcrumb,
  showBreadcrumbIcon,
  showFullScreen,
  showThemeSetting,
  uniqueOpened,
  openFirstMenu,
  showClean
}

const defaultSystem = {
  titleReverse,
  titleSeparator,
  language: i18nLanguage || language,
  allowRegister,
  loginRSA,
  supportVisit,
  websiteTitle,
  copyright,
  websiteLogo,
  loginInterception,
  routesWhiteList,
  recordRoute,
  loadingText,
  messageDuration,
  rolesControl
}
const state = () => ({
  device: 'desktop',
  collapse: collapse || false,
  theme: getLocalStorage('theme') || { ...defaultTheme },
  system: { ...defaultSystem },
  extra: { first: '', transferRouteName: '' }
})

const getters = {
  device: (state) => state.device,
  collapse: (state) => state.collapse,
  theme: (state) => state.theme,
  system: (state) => state.system,
  extra: (state) => state.extra
}
const mutations = {
  openSideBar(state) {
    state.collapse = false
  },
  foldSideBar(state) {
    state.collapse = true
  },
  toggleDevice(state, device) {
    state.device = device
  },
  toggleCollapse(state) {
    state.collapse = !state.collapse
    setLocalStorage('collapse', `{"collapse":${state.collapse}}`)
  },
  changeLanguage(state, language) {
    i18n.global.locale.value = language
    defaultSystem.language = language
    state.system.language = language
    setLocalStorage('language', `{"i18nLanguage":"${language}"}`)
  },
  changeLayout(state, layout) {
    state.theme.layout = layout
    setLocalStorage('layout', `{"layout":"${layout}"}`)
  },
  saveTheme(state) {
    setLocalStorage('theme', JSON.stringify(state.theme))
    baseMessage('message.theme.保存成功', 'success', false, 'element-hey-message-success')
  },
  resetTheme(state) {
    const oldLayout = state.theme.layout
    state.theme = { ...defaultTheme }
    localStorage.removeItem('theme')
    document.getElementsByTagName(
      'body'
    )[0].className = `element-theme-${state.theme.themeName}`
    if (state.device === 'mobile') {
      state.theme.layout = oldLayout
      baseMessage('message.theme.移动端布局被锁定', 'warning', false, 'element-hey-message-warning')
    }
  },
  async getSystemSettings(state, settings) {
    Object.keys(settings).forEach((key) => {
      state.system[key] = settings[key]
    })
  },
  async changeSystemSetting(state, item) {
    const { data } = await doEdit(item)
    if (data) {
      Object.keys(data).forEach((key) => {
        state.system[key] = data[key]
      })
    }
  },
  resetSystem(state) {
    state.system = { ...defaultSystem }
    localStorage.removeItem('theme')
  },
  setExtra(state, value) {
    state.extra.first = value
  }
}
const actions = {
  openSideBar({ commit }) {
    commit('openSideBar')
  },
  foldSideBar({ commit }) {
    commit('foldSideBar')
  },
  toggleDevice({ commit }, device) {
    commit('toggleDevice', device)
  },
  toggleCollapse({ commit }) {
    commit('toggleCollapse')
  },
  changeLanguage: ({ commit }, language) => {
    commit('changeLanguage', language)
  },
  changeLayout: ({ commit }, layout) => {
    commit('changeLayout', layout)
  },
  saveTheme({ commit }) {
    commit('saveTheme')
  },
  resetTheme({ commit }) {
    commit('resetTheme')
  },
  async getSystemSettings({ commit }) {
    const { data } = await getList()
    commit('getSystemSettings', data)
  },
  changeSystemSetting({ commit }, item) {
    commit('changeSystemSetting', item)
  },
  resetSystem({ commit }) {
    commit('resetSystem')
  },
  setExtra({ commit }, value) {
    commit('setExtra', value)
  }
}
export default { state, getters, mutations, actions }
