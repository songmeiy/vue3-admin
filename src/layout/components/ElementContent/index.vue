<template>
  <div
    class="element-app-main"
    :class="{ ['element-app-main-' + theme.layout ]: theme.layout === 'horizontal' }"
  >
    <section v-if="routerReView">
      <router-view v-slot="{ Component, route }">
        <transition  mode="out-in" name="fade-transform">
          <component :is="Component" v-if="route.meta.noKeepAlive" />
          <keep-alive v-else >
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
      <element-footer v-show="theme.showFooter" />
    </section>
  </div>
</template>

<script>
import { computed, onMounted, ref, getCurrentInstance } from 'vue'
import VabProgress from 'nprogress'
export default {
  name: 'ElementContent',
  setup() {
    const routerReView = ref(true)
    const { $baseEventBus, $store } = getCurrentInstance().appContext.config.globalProperties
    const theme = computed(() => $store.state.settings.theme)
    onMounted(() => {
      const { showProgressBar } = theme.value
      // 单页面情况下重载路由
      $baseEventBus.on('reload-router-view', () => {
        routerReView.value = false
        if (showProgressBar) VabProgress.start()
        routerReView.value = true
        setTimeout(() => {
          if (showProgressBar) VabProgress.done()
        }, 200)
      })
    })
    return {
      routerReView,
      theme
    }
  }
}
</script>
<style lang="scss" scoped>
.element-app-main {
  &-horizontal {
    width: 92%!important;
    margin: auto;
  }
}
</style>
