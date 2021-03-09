/**
 * @description 路由拦截状态管理，目前两种模式：all模式与intelligence模式，其中partialRoutes是菜单暂未使用
 */
import { getList } from '@/api/system/router'
import { convertRouter, filterRoutes } from '@/utils/routes'
import router, { constantRoutes, asyncRoutes } from '@/router'
const state = () => ({
  routes: [],
  cachedRoutes: []
})
import defaultConfig from '@/config'
const { authentication } = defaultConfig
const getters = {
  routes: (state) => state.routes,
  cachedRoutes: (state) => state.cachedRoutes
}
const mutations = {
  /**
   * @description 多模式设置路由
   * @param {*} state
   * @param {*} routes
   */
  setRoutes(state, routes) {
    state.routes = routes
  },
  /**
   * @description 设置缓存Name数组
   * @param {*} state
   * @param {*} routes
   */
  setCachedRoutes(state, routes) {
    state.cachedRoutes = routes
  },
  /**
   * @description 修改Meta
   * @param {*} state
   * @param options
   */
  changeMenuMeta(state, options) {
    function handleRoutes(routes) {
      return routes.map((route) => {
        if (route.name === options.name) Object.assign(route.meta, options.meta)
        if (route.children && route.children.length) { route.children = handleRoutes(route.children) }
        return route
      })
    }
    state.routes = handleRoutes(state.routes)
  }
}
const actions = {
  /**
   * @description 多模式设置路由
   * @param {*} { commit }
   * @returns
   */
  async setRoutes({ commit, dispatch }) {
    let addedRoutes = []
    if (authentication === 'intelligence') {
      const finallyRoutes = filterRoutes([...constantRoutes, ...asyncRoutes])
      commit('setRoutes', finallyRoutes)
      addedRoutes = asyncRoutes
    } else if (authentication === 'all') {
      const { data } = await getList()
      // if (data[data.length - 1].path !== '*') {
      //   data.push({ path: '*', redirect: '/404', hidden: true })
      // }
      addedRoutes = convertRouter(data)
      const finallyRoutes = filterRoutes([...constantRoutes, ...addedRoutes])
      commit('setRoutes', finallyRoutes)
    }
    addedRoutes.forEach((item) => {
      router.addRoute(item)
    })
    await dispatch('settings/setExtra', addedRoutes[0].name, { root: true })
  },
  /**
   * @description 设置缓存Name数组
   * @param {*} { commit }
   * @param {*} routes
   */
  setCachedRoutes({ commit }, routes) {
    commit('setCachedRoutes', routes)
  },
  /**
   * @description 修改Route Meta
   * @param {*} { commit }
   * @param options
   */
  changeMenuMeta({ commit }, options = {}) {
    commit('changeMenuMeta', options)
  }
}
export default { state, getters, mutations, actions }
