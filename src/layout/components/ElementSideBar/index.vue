<template>
  <el-scrollbar
    :class="{ 'is-collapse': collapse, 'side-bar-common': layout === 'common' }"
    class="element-side-bar"
  >
    <element-logo v-if="layout === 'vertical' || layout === 'comprehensive'" />
    <el-menu
      :active-text-color="variables['menu-color-active']"
      :background-color="variables['menu-background']"
      :collapse="collapse"
      :collapse-transition="false"
      :default-active="activeMenu"
      :default-openeds="defaultOpeneds"
      :text-color="variables['menu-color']"
      :unique-opened="theme.uniqueOpened"
      menu-trigger="click"
      mode="vertical"
    >
      <template v-for="route in handleRoutes">
        <element-menu v-if="!route.hidden" :key="route.path" :item="route"/>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import variables from '@/style/variables/variables.scss'
import { ref, computed, watch, onBeforeMount, getCurrentInstance } from 'vue'
import defaultConfig from '@/config'
import { handleActivePath } from '@/utils/routes'
import { useRoute } from 'vue-router'
export default {
  name: 'ElementSideBar',
  props: {
    layout: {
      type: String,
      default: 'vertical'
    }
  },
  setup() {
    const $route = useRoute()
    const { $store } = getCurrentInstance().appContext.config.globalProperties
    const activeMenu = ref('')
    const { defaultOpeneds } = defaultConfig
    const theme = computed(() => $store.state.settings.theme)
    const extra = computed(() => $store.state.settings.extra)
    const collapse = computed(() => $store.state.settings.collapse)
    const routes = computed(() => $store.state.routes.routes)
    const handleRoutes = computed(() => {
      return theme.value.layout === 'comprehensive'
        ? handlePartialRoutes.value
        : routes.value.flatMap((route) =>
          route.hidden === true && route.children
            ? route.children
            : route
        )
    })
    const handlePartialRoutes = computed(() => {
      return extra.value.first ? routes.value.find((item) => item.name === extra.value.first).children : []
    })
    onBeforeMount(() => {
      activeMenu.value = handleActivePath($route)
    })
    watch(() => $route.path, () => {
      activeMenu.value = handleActivePath($route)
    })
    return {
      variables,
      activeMenu,
      collapse,
      handleRoutes,
      defaultOpeneds,
      theme
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin active {
  &:hover {
    color: $base-color-white;
    background-color: $base-menu-background-active !important;
  }

  &.is-active {
    color: $base-color-white;
    background-color: $base-menu-background-active !important;
  }
}

.element-side-bar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: $base-z-index + 1;
  width: $base-left-menu-width;
  height: 100vh;
  overflow: hidden;
  background: $base-menu-background;
  box-shadow: $base-box-shadow;
  transition: $base-transition;

  &.side-bar-common {
    top: $base-top-bar-height;
    height: calc(100vh - #{$base-top-bar-height});
  }

  &.is-collapse {
    width: $base-left-menu-width-min;
    border-right: 0;
  }

  :deep {
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
    .el-menu {
      border: 0;
      text-align: left;
    }
    .el-menu-item,
    .el-submenu__title {
      height: $base-menu-item-height;
      overflow: hidden;
      line-height: $base-menu-item-height;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: middle;
      i {
        color: inherit;
      }
    }
    .el-menu-item {
      @include active;
    }
  }
}
</style>
