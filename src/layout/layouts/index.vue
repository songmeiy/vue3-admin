<template>
  <div :class="classObj" class="vue-admin-beautiful-wrapper">
    <component
      :is="'element-layout-' + theme.layout"
      :collapse="collapse"
      :device="device"
      :fixed-header="theme.fixedHeader"
      :show-tabs="theme.showTabs"
    />
    <el-backtop target="#app" />
    <!--  主题组件放到layouts下防止主题切换，导致主题组件重新加载 -->
    <element-theme-drawer />
    <element-theme-setting v-if="theme.showThemeSetting && device !== 'mobile'"/>
  </div>
</template>
<script>
import ElementThemeDrawer from '@/layout/components/ElementTheme/components/ElementThemeDrawer'
import ElementThemeSetting from '@/layout/components/ElementTheme/components/ElementThemeSetting'
import { computed, ref, onMounted, onUnmounted, getCurrentInstance, watch } from 'vue'
export default {
  name: 'Layout',
  components: {
    ElementThemeDrawer,
    ElementThemeSetting
  },
  setup() {
    const { $store } = getCurrentInstance().appContext.config.globalProperties
    const theme = computed(() => $store.state.settings.theme)
    const collapse = computed(() => $store.state.settings.collapse)
    const device = computed(() => $store.state.settings.device)
    const screenWidth = ref()
    const classObj = computed(() => {
      return {
        mobile: device.value === 'mobile'
      }
    })
    const isMobile = ref(false)
    const oldLayout = ref('')
    const handleLayout = () => {
      isMobile.value = screenWidth.value - 1 < 992
      if (isMobile.value) {
        $store.dispatch('settings/foldSideBar')
      } else {
        $store.dispatch('settings/openSideBar')
      }
      $store.dispatch('settings/changeLayout', isMobile.value ? 'vertical' : oldLayout.value)
      $store.dispatch('settings/toggleDevice', isMobile.value ? 'mobile' : 'desktop')
    }
    onMounted(() => {
      document.getElementsByTagName(
        'body'
      )[0].className = `element-theme-${theme.value.themeName}`
      // 先把layout保存一下
      oldLayout.value = theme.value.layout
      handleLayout()
    })
    onUnmounted(() => {
      window.removeEventListener('resize', () => {})
    })
    onMounted(() => {
      window.addEventListener('resize', function() {
        return (() => {
          window.screenWidth = document.body.clientWidth
          screenWidth.value = window.screenWidth
        })()
      })
    })
    watch(() => screenWidth.value, () => {
      handleLayout()
    })
    return {
      theme,
      device,
      collapse,
      classObj
    }
  }
}
</script>

<style lang="scss" scoped>
.vue-admin-beautiful-wrapper {
  position: relative;
  width: 100%;
  height: 100%;

  [class*='element-layout-'] {
    position: relative;

    :deep(.element-layout-header) {
      box-shadow: $base-box-shadow;
    }

    &.fixed {
      padding-top: $base-nav-height + $base-tabs-height;
    }

    &.fixed.no-tabs-bar {
      padding-top: $base-nav-height;
    }
  }

  :deep(.fixed-header) {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: $base-z-index - 1;
    width: 100%;
    overflow: hidden;
  }
  :deep(.element-main) {
    position: relative;
    width: auto;
    min-height: 100%;
    margin-left: $base-left-menu-width;

    &.is-collapse-main {
      margin-left: $base-left-menu-width-min;

      .fixed-header {
        left: $base-left-menu-width-min;
        width: calc(100% - #{$base-left-menu-width-min});
      }
    }
  }

/* 手机端开始 */
  &.mobile {
    :deep(.element-layout-vertical){
      .el-scrollbar.element-side-bar.is-collapse {
        width: 0;
      }

      .element-main {
        .fixed-header {
          left: 0;
          width: 100%;
        }

        width: 100%;
        margin-left: 0;
      }
    }

    /* 隐藏分页和页码跳转 */
    .el-pager,
    .el-pagination__jump {
      display: none;
    }
  }
}
/* 手机端结束 */
</style>
