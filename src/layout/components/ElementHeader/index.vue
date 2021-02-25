<template>
  <div class="element-header">
    <div class="element-main">
      <div class="left-panel">
        <element-logo />
      </div>
      <div class="right-panel">
        <el-menu
          v-if="layout === 'horizontal'"
          :active-text-color="variables['menu-color-active']"
          :background-color="variables['menu-background']"
          :default-active="activeMenu"
          :text-color="variables['menu-color']"
          menu-trigger="hover"
          mode="horizontal"
        >
          <template v-for="route in handleRoutes">
            <element-menu
              v-if="!route.hidden"
              :key="route.path"
              :item="route"
              :layout="layout"
            />
          </template>
        </el-menu>
        <element-error-log />
        <element-clean />
        <element-search />
        <element-notice />
        <element-full-screen />
        <element-language />
        <element-theme />
        <element-refresh />
        <element-avatar />
      </div>
    </div>
  </div>
</template>

<script>
import variable from '@/style/variables/variables.scss'
import { ref, computed, watch, onBeforeMount, getCurrentInstance } from 'vue'
import { handleActivePath } from '@/utils/routes'
import { useRoute } from 'vue-router'
export default {
  name: 'ElementHeader',
  props: {
    layout: {
      type: String,
      default: 'horizontal'
    }
  },
  setup() {
    const $route = useRoute()
    const { $store } = getCurrentInstance().appContext.config.globalProperties
    const activeMenu = ref('')
    const menuTrigger = ref('hover')
    const routes = computed(() => $store.state.routes.routes)
    const handleRoutes = computed(() => {
      return routes.value.flatMap((route) => {
        return route.hidden === true && route.children ? route.children : route
      })
    })
    const variables = computed(() => {
      return variable
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
      handleRoutes,
      menuTrigger
    }
  }
}
</script>

<style lang="scss" scoped>
.element-header {
  display: flex;
  align-items: center;
  justify-items: flex-end;
  height: $base-top-bar-height;
  background: $base-menu-background;

  .element-main {
    padding: 0 $base-padding 0 $base-padding;
    .left-panel {
      display: flex;
      float: left;
    }
    .right-panel {
      display: flex;
      float: right;
      align-items: center;
      justify-content: flex-end;
      height: $base-top-bar-height;
      /* 下面几行webstorm可能会出警告，但是千万别加逗号 */
      :deep {
        > .el-menu--horizontal.el-menu
        > .el-submenu
        > .el-submenu__title
        > .el-submenu__icon-arrow {
          float: right;
          margin-top: ($base-top-bar-height - 11) / 2 !important;
        }

        > .el-menu--horizontal.el-menu > .el-menu-item {
          .el-tag {
            margin-top: $base-top-bar-height / 2 - 7.5 !important;
            margin-left: 5px;
          }

          .element-dot {
            float: right;
            margin-top: ($base-top-bar-height - 6) / 2 + 1;
          }

          @media only screen and (max-width: 1199px) {
            .el-tag {
              display: none;
            }
          }
        }

        .el-menu {
          &.el-menu--horizontal {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            height: $base-top-bar-height;
            border-bottom: 0 solid transparent !important;

            .el-menu-item,
            .el-submenu__title {
              height: $base-top-bar-height/1.3;
              padding: 0 $base-padding;
              line-height: $base-top-bar-height/1.3;
            }

            > .el-menu-item,
            > .el-submenu {
              height: $base-top-bar-height;
              line-height: $base-top-bar-height;

              .el-submenu__icon-arrow {
                float: right;
                margin-top: ($base-menu-item-height - 16) / 2;
              }

              > .el-submenu__title {
                height: $base-top-bar-height;
                line-height: $base-top-bar-height;
              }
            }
          }
          .el-submenu,
          .el-menu-item {
            i {
              color: inherit;
            }

            &.is-active {
              border-bottom: 0 solid transparent;
              background: $base-color-blue;
              .el-submenu__title {
                border-bottom: 0 solid transparent;
                background: transparent!important;
              }
            }
          }
          .el-menu-item {
            &.is-active {
              background: $base-color-blue !important;
            }
          }
        }

        .user-name {
          color: rgba($base-color-white, 0.9);
        }

        .user-name + i {
          color: rgba($base-color-white, 0.9);
        }
      }
    }
  }
}
</style>
