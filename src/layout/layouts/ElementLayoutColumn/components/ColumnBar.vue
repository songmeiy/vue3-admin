<template>
  <el-scrollbar
    :class="{ 'is-collapse': collapse, ['column-bar-container-' + theme.columnStyle]: true }"
    class="column-bar-container"
  >
    <element-logo />
    <el-tabs
      v-model="extra.first"
      tab-position="left"
      @tab-click="handleTabClick"
    >
      <el-tab-pane
        v-for="item in handleRoutes"
        :key="item.name"
        :name="item.name"
      >
        <template #label>
          <div
            :class="{ ['column-grid-' + theme.columnStyle]: true, }"
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
  name: 'ColumnBar',
  setup() {
    const $route = useRoute()
    const { defaultOpeneds } = defaultConfig
    const { $store, $router } = getCurrentInstance().appContext.config.globalProperties
    const collapse = computed(() => $store.state.settings.collapse)
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
    const handleTabClick = async(handler) => {
      if (handler !== true && theme.value.openFirstMenu) {
        await $router.push(handlePartialRoutes.value[0].path)
        await $store.dispatch('settings/openSideBar')
      }
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
  }

  &-vertical,
  &-card {
    :deep(.el-tabs + .el-menu) {
      left: $base-left-menu-width-min;
      width: $base-left-menu-width - $base-left-menu-width-min;
      border: 0;
    }
  }

  &-horizontal {
    :deep(.logo-container-column) {
      .logo {
        width: $base-left-menu-width-min * 1.3 !important;
      }

      .title {
        margin-left: $base-left-menu-width-min * 1.3 !important;
      }
    }
    :deep(.el-tabs + .el-menu) {
      left: $base-left-menu-width-min * 1.3;
      width: $base-left-menu-width - $base-left-menu-width-min * 1.3;
      border: 0;
    }
  }

  &-card {
    :deep {
      .el-tabs {
        .el-tabs__item {
          padding: 5px !important;

          .column-grid {
            width: $base-left-menu-width-min - 10 !important;
            height: $base-left-menu-width-min - 10 !important;
            border-radius: 5px;
          }

          &.is-active {
            background: transparent !important;

            .column-grid {
              background: $base-color-blue;
            }
          }
        }
      }

      .el-tabs + .el-menu {
        left: $base-left-menu-width-min + 10;
        width: $base-left-menu-width - $base-left-menu-width-min - 20;
      }

      .el-submenu .el-submenu__title,
      .el-menu-item {
        min-width: 180px;
        border-radius: 5px;
      }
    }
  }

  .column-grid {
    display: flex;
    align-items: center;
    width: $base-left-menu-width-min;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    white-space: nowrap;

    &-vertical,
    &-card {
      justify-content: center;
      height: $base-left-menu-width-min;
      > div {
        .svgIcon {
          width: 100%;
          text-align: center;
          svg {
            position: relative;
            top: 8px;
            display: block;
            width: 100%;
            height: $base-font-size-default + 4;
          }
        }
        .homeTitle {
          width: 100%;
          text-align: center;
        }
      }
    }

    &-horizontal {
      justify-content: left;
      width: $base-left-menu-width-min * 1.3;
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
          }
        }
        .homeTitle {
          float: left;
          width: 80%;
          text-align: left;
        }
      }
    }
  }

  :deep {
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }

    .el-tabs {
      position: fixed;

      .el-tabs__header.is-left {
        margin-right: 0 !important;

        .el-tabs__nav-wrap.is-left {
          margin-right: 0 !important;
          background: $base-column-first-menu-background;

          .el-tabs__nav-scroll {
            height: 100%;
            overflow-y: auto;

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

  &.is-collapse {
    :deep {
      width: 0;
    }
  }
}
</style>
