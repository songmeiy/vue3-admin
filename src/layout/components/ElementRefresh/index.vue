<template>
  <el-tooltip
    v-if="theme.showRefresh"
    placement="bottom"
    :effect="theme.themeName === 'white' ? 'dark' : 'light'"
    :content="translate('layout', '刷新当前页')"
  >
    <SvgIcon
      icon-class="refresh"
      class="quick-button"
      :class="{ ['quick-button-' + theme.layout+ '-' +theme.themeName]: true }"
      @click="refreshRoute"
    />
  </el-tooltip>
</template>

<script>
import { computed, getCurrentInstance } from 'vue'
import { translate } from '@/utils/i18n'
import { useRoute } from 'vue-router'
export default {
  name: 'ElementRefresh',
  setup() {
    const $route = useRoute()
    const { $store, $router, $baseEventBus } = getCurrentInstance().appContext.config.globalProperties
    const theme = computed(() => $store.state.settings.theme)
    const extra = computed(() => $store.state.settings.extra)
    const visitedRoutes = computed(() => $store.state.tabs.visitedRoutes)
    const refreshRoute = async() => {
      const parentRouteName = $route.matched.slice(0, -1).map((item) => item.name).join(',')
      const transferRoute = visitedRoutes.value.find((item) => {
        return (item.name !== $route.name && item.matched.slice(0, -1).join(',') === parentRouteName)
      })
      if (transferRoute) {
        extra.value.transferRouteName = $route.path
        $router.replace(transferRoute).then(() => {
          extra.value.transferRouteName = ''
          $router.replace($route)
        })
      } else {
        $baseEventBus.emit('reload-router-view')
      }
    }
    return {
      theme,
      refreshRoute,
      translate
    }
  }
}
</script>
