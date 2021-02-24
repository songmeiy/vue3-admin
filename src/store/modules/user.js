/**
 * @author WangZeping zepingwong@gmail.com
 * @description 登录、获取用户信息、退出登录、清除accessToken逻辑，不建议修改
 */
import { getMyInfo, login } from '@/api/user'
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken
} from '@/utils/token'
import defaultConfig from '@/config'
import { baseMessage, baseNotify } from '@/components/ElementPlus'
import store from '@/store'
import { computed } from 'vue'
import router from '@/router'
const { tokenName } = defaultConfig
const system = computed(() => store.state.settings.system)
const state = () => ({
  accessToken: getAccessToken(),
  userInfo: {}
})
const getters = {
  accessToken: (state) => state.accessToken,
  userInfo: (state) => state.userInfo
}
const mutations = {
  /**
   * @author WangZeping zepingwong@gmail.com
   * @description 设置accessToken
   * @param {*} state
   * @param {*} accessToken
   */
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
    setAccessToken(accessToken)
  },
  /**
   * @author WangZeping zepingwong@gmail.com
   * @description 设置用户信息
   * @param {*} state
   * @param {*} info
   */
  getUserInfo(state, info) {
    Object.keys(info).forEach((key) => {
      if (key === 'personality') {
        state.userInfo[key] = info[key].split(',')
      } else {
        state.userInfo[key] = info[key]
      }
    })
  },
  /**
   * @author WangZeping zepingwong@gmail.com
   * @description 清除用户token信息
   */
  resetAll() {
    removeAccessToken()
  },
  /**
   * @author WangZeping zepingwong@gmail.com
   * @description 设置虚拟角色
   */
  setVirtualRoles(state) {
    state.userInfo.avatar = 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif'
    state.userInfo.username = 'admin(未开启登录拦截)'
  }
}
const actions = {
  /**
   * @author WangZeping zepingwong@gmail.com
   * @description 登录拦截放行时，设置虚拟角色
   * @param {*} { commit, dispatch }
   */
  setVirtualRoles({ commit, dispatch }) {
    dispatch('acl/setFull', true, { root: true })
    commit('setVirtualRoles')
  },
  /**
   * @author WangZeping zepingwong@gmail.com
   * @description 登录
   * @param {*} { commit }
   * @param {*} userInfo
   */
  async login({ commit, dispatch }, userInfo) {
    if (system.value.loginInterception) {
      const { data } = await login(userInfo)
      const accessToken = data[tokenName]
      if (accessToken) {
        await commit('setAccessToken', accessToken)
        await dispatch('getUserInfo')
        await dispatch('routes/setRoutes', true, { root: true })
        loginNotify()
        await router.push({ path: '/' })
      } else {
        baseMessage(`登录接口异常，未正确返回${tokenName}...`, 'error', false, 'element-hey-message-error')
      }
    } else {
      await dispatch('getUserInfo')
      await dispatch('routes/setRoutes', true, { root: true })
      loginNotify()
      await router.push({ path: '/' })
    }
  },
  /**
   * @author WangZeping zepingwong@gmail.com
   * @description 获取用户信息接口 这个接口非常非常重要，如果没有明确底层前逻辑禁止修改此方法，错误的修改可能造成整个框架无法正常使用
   * @param {*} { commit, dispatch, state }
   * @returns
   */
  async getUserInfo({ commit, dispatch }) {
    const accessToken = getAccessToken()
    if (system.value.loginInterception) {
      const { data } = await getMyInfo({ accessToken: accessToken })
      if (!data) {
        baseMessage(`验证失败，请重新登录...`, 'error', false, 'element-hey-message-error')
        return false
      }
      const { username, roles, ability } = data
      if (username && roles && Array.isArray(roles)) {
        dispatch('acl/setRole', roles, { root: true })
        if (ability && ability.length > 0) {
          dispatch('acl/setAbility', ability, { root: true })
        }
        commit('getUserInfo', data)
      } else {
        baseMessage(`用户信息接口异常`, 'error', false, 'element-hey-message-error')
      }
    } else {
      await dispatch('user/setVirtualRoles')
    }
  },

  /**
   * @author WangZeping zepingwong@gmail.com
   * @description 退出登录
   * @param {*} { dispatch }
   */
  async logout({ dispatch }) {
    // await logout(state.accessToken)
    await dispatch('resetAll')
  },
  /**
   * @author WangZeping zepingwong@gmail.com
   * @description 重置accessToken、roles、ability、router等
   * @param {*} { commit, dispatch }
   */
  async resetAll({ dispatch, commit }) {
    await dispatch('setAccessToken', '')
    await dispatch('acl/setFull', false, { root: true })
    await dispatch('acl/setRole', [], { root: true })
    await dispatch('acl/setAbility', [], { root: true })
    commit('resetAll')
  },
  /**
   * @author WangZeping zepingwong@gmail.com
   * @description 设置token
   */
  setAccessToken({ commit }, accessToken) {
    commit('setAccessToken', accessToken)
  }
}
const loginNotify = () => {
  const hour = new Date().getHours()
  const thisTime = hour < 8 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 18 ? '下午好' : '晚上好'
  baseNotify(
    `欢迎登录${system.value.websiteTitle}`,
    `${thisTime}！`,
    'success'
  )
}
export default { state, getters, mutations, actions }
