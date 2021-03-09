/**
 * @author WangZeping zepingwong@gmail.com
 * @description 路由守卫，目前两种模式：all模式与intelligence模式
 */
import router from '@/router'
import store from '@/store'
import getPageTitle from '@/utils/pageTitle'
import { computed } from 'vue'
import { toLoginRoute } from '@/utils/routes'
import VabProgress from 'nprogress'
import 'nprogress/nprogress.css'
VabProgress.configure({
  easing: 'ease',
  speed: 500,
  trickleSpeed: 200,
  showSpinner: false
})

const system = computed(() => store.state.settings.system)
router.beforeEach(async(to, from, next) => {
  const { showProgressBar } = store.state.settings.theme
  if (showProgressBar) VabProgress.start()
  let hasToken = store.state.user.accessToken
  if (!system.value.loginInterception) hasToken = true
  if (hasToken) {
    if (to.path === '/login') {
      if (system.value.loginInterception) {
        next({ path: '/' })
      } else {
        next()
      }
      if (showProgressBar) VabProgress.done()
    } else {
      const hasRoles = store.state.acl.role.length > 0 || store.state.acl.ability.length > 0 || store.state.acl.admin
      if (hasRoles) {
        next()
      } else {
        // 这里是刷新动作之后
        try {
          await store.dispatch('settings/getSystemSettings')
          await store.dispatch('user/getUserInfo')
          await store.dispatch('routes/setRoutes')
          next({ path: '/', replace: true })
        } catch {
          await store.dispatch('user/resetAll')
          await router.push(toLoginRoute(to.path))
        }
      }
    }
  } else {
    if (system.value.routesWhiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      await router.push(toLoginRoute(to.path))
    }
  }
})
router.afterEach((to) => {
  getPageTitle(to.meta.title)
  if (VabProgress.status) VabProgress.done()
})
