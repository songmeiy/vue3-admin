<template>
  <el-scrollbar
    class="column-bar-container"
  >
    <element-logo
      :class="{ 'collapse': collapse }"
    ></element-logo>
    <el-tabs
      v-model="extra.first"
      tab-position="left"
      :class="{ 'is-collapse': collapse }"
      @tab-click="handleTabClick"
    >
      <el-tab-pane
        v-for="item in handleRoutes"
        :key="item.name"
        :name="item.name"
        :class="{ 'is-collapse': collapse }"
      >
        <template #label>
          <div
            :title="translate('router', item.meta.title)"
            class="column-grid"
          >
            <div>
              <div class="svgIcon">
                <SvgIcon v-if="item.meta.isCustomSvg && item.meta.icon" :icon-class="item.meta.icon" />
                <i v-else-if="item.meta.icon" :class="item.meta.icon" />
              </div>
              <div class="homeTitle">
                {{ translate('router', item.meta.title) }}
              </div>
            </div>
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>

    <el-menu
      :background-color="variables['column-second-menu-background']"
      :default-active="activeMenu"
      :default-openeds="defaultOpeneds"
      :unique-opened="theme.uniqueOpened"
      mode="vertical"
    >
      <div class="title">{{ system.websiteTitle }}</div>
      <el-divider>
        {{ translate('router', handleGroupTitle) }}
      </el-divider>
      <template v-for="route in handlePartialRoutes">
        <element-menu v-if="!route.hidden" :key="route.path" :item="route" />
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { translate } from '@/utils/i18n'
import variables from '@/style/variables/variables.scss'
import defaultConfig from '@/config'
import { handleActivePath } from '@/utils/routes'
import { computed, watch, ref, onMounted, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'HideBar',
  setup() {
    const $route = useRoute()
    const { defaultOpeneds } = defaultConfig
    const { $store, $router } = getCurrentInstance().appContext.config.globalProperties
    const collapse = computed(() => $store.state.settings.collapse)
    const system = computed(() => $store.state.settings.system)
    const theme = computed(() => $store.state.settings.theme)
    const extra = computed(() => $store.state.settings.extra)
    const routes = computed(() => $store.state.routes.routes)
    const activeMenu = ref('')
    const handleRoutes = computed(() => {
      return routes.value.filter((item) => item.hidden !== true && item.meta)
    })
    // 二级路由
    const handlePartialRoutes = computed(() => {
      return extra.value.first ? routes.value.find((item) => item.name === extra.value.first).children : []
    })
    const handleGroupTitle = computed(() => {
      return routes.value.find((item) => item.name === extra.value.first).meta.title
    })
    const handleTabClick = (handler) => {
      if (handler !== true && theme.value.openFirstMenu) {
        $router.push(handlePartialRoutes.value[0].path)
      }
      $store.dispatch('settings/foldSideBar')
    }
    onMounted(() => {
      activeMenu.value = handleActivePath($route)
      const firstMenu = $route.matched[0].name
      if (extra.value.first !== firstMenu) {
        extra.value.first = firstMenu
        handleTabClick(true)
      }
    })
    watch(() => $route.path, () => {
      activeMenu.value = handleActivePath($route)
      const firstMenu = $route.matched[0].name
      if (extra.value.first !== firstMenu) {
        extra.value.first = firstMenu
        handleTabClick(true)
      }
    })
    return {
      theme,
      system,
      extra,
      collapse,
      variables,
      activeMenu,
      handleRoutes,
      defaultOpeneds,
      handleGroupTitle,
      handlePartialRoutes,
      translate,
      handleTabClick
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin active {
  &:hover {
    color: $base-color-blue;
    background-color: $base-column-second-menu-background-active !important;
  }

  &.is-active {
    color: $base-color-blue;
    background-color: $base-column-second-menu-background-active !important;
  }
}
.column-bar-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: $base-left-menu-width;
  height: 100vh;
  overflow: hidden;
  background: $base-column-second-menu-background;
  box-shadow: $base-box-shadow;
  :deep {
    * {
      transition: $base-transition;
    }
    .logo-container-column {
      .logo {
        width: $base-left-menu-width-min * 1.3 !important;
      }
      .title {
        margin-left: $base-left-menu-width-min * 1.3 !important;
      }
    }
  }

  .column-grid {
    display: flex;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    white-space: nowrap;
    justify-content: left;
    height: $base-left-menu-width-min / 1.3;
    padding-left: $base-padding / 2;
    > div {
      display: inline;
      .svgIcon {
        float: left;
        width: 20%;
        text-align: center;
        svg {
          position: relative;
          top: 11px;
          display: block;
          width: 100%;
          height: $base-font-size-default + 4;
          font-size: 16px;
          font-weight: 600;
        }
      }
      .homeTitle {
        float: left;
        width: 80%;
        text-align: left;
        font-size: 16px;
        font-weight: 600;
      }
    }
  }

  :deep {
    .is-collapse {
      width: 0!important;
    }
    .el-scrollbar__wrap {
      overflow-x: hidden;
      width: $base-left-menu-width;
      .el-scrollbar__view {
        z-index: 2089;
      }
    }
    .collapse {
      width: 0!important;
      height: 0!important;
    }
    .noCollapse {
      width: 0!important;
      height: 0!important;
    }
    .logo-container {
      width: $base-left-menu-width;
      z-index: 2090;
      height: $base-logo-height;
      background: $base-column-first-menu-background;
    }
    .el-menu {
      left: 0;
      width: 100%;
      border: 0;
    }
    .el-tabs {
      z-index: 2090;
      position: fixed;
      left: 0;
      width: $base-left-menu-width;
      border: 0;
      .el-tabs__header.is-left {
        margin-right: 0 !important;
        width: 100%;

        .el-tabs__nav-wrap.is-left {
          margin-right: 0 !important;
          background: $base-column-first-menu-background;

          .el-tabs__nav-scroll {
            height: 100%;
            overflow-y: auto;
            padding: 0;

            &::-webkit-scrollbar {
              width: 0;
              height: 0;
            }
          }
        }
      }

      .el-tabs__nav {
        height: calc(100vh - #{$base-logo-height});
        background: $base-column-first-menu-background;
      }

      .el-tabs__item {
        height: auto;
        padding: 0;
        color: $base-color-white;

        &.is-active {
          background: $base-color-blue;
        }
      }
    }

    .el-tabs__active-bar.is-left,
    .el-tabs--left .el-tabs__nav-wrap.is-left::after {
      display: none;
    }

    .el-menu {
      border: 0;
      .title {
        text-align: center;
        width: 100%;
        line-height: 60px;
        font-size: 20px;
      }
      .el-divider {
        margin: 0 0 $base-margin 0;
        background-color: #f6f6f6;
        &__text {
          color: $base-color-black;
        }
      }
      .el-menu-item,
      .el-submenu__title {
        height: $base-menu-item-height;
        overflow: hidden;
        line-height: $base-menu-item-height;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
        @include active;
      }
    }
  }
}
</style>
