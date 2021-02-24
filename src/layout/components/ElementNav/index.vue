<template>
  <div class="element-nav">
    <el-row :gutter="15">
      <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="4">
        <div class="left-panel">
          <element-fold />
          <el-tabs
            v-if="theme.layout === 'comprehensive'"
            v-model="extra.first"
            tab-position="top"
            @tab-click="handleTabClick"
          >
            <el-tab-pane
              v-for="item in handleRoutes"
              :key="item.name"
              :name="item.name"
            >
              <template #label>
                <SvgIcon
                  v-if="item.meta.icon"
                  :iconClass="item.meta.icon"
                  style="min-width: 16px"
                />
                {{ translate('router', item.meta.title) }}
              </template>
            </el-tab-pane>
          </el-tabs>
          <element-breadcrumb v-else class="hidden-xs-only" />
        </div>
      </el-col>
      <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="20">
        <div class="right-panel">
          <element-error-log />
          <element-search />
          <element-notice />
          <element-full-screen />
          <element-language />
          <element-theme />
          <element-refresh />
          <element-avatar />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { translate } from '@/utils/i18n'
import { computed, ref, watch, onBeforeMount, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'ElementNav',
  setup() {
    const $route = useRoute()
    const { $store, $router } = getCurrentInstance().appContext.config.globalProperties
    const firstMenu = ref('')
    const theme = computed(() => $store.state.settings.theme)
    const extra = computed(() => $store.state.settings.extra)
    const routes = computed(() => $store.state.routes.routes)
    const handleRoutes = computed(() => {
      return routes.value.filter((item) => item.hidden !== true && item.meta)
    })
    const handlePartialRoutes = computed(() => {
      return extra.value.first ? routes.value.find((item) => item.name === extra.value.first).children : []
    })
    const handleTabClick = (handler) => {
      if (handler !== true && theme.value.openFirstMenu) {
        $router.push(handlePartialRoutes.value[0].path)
      }
    }
    onBeforeMount(() => {
      const firstMenu = $route.matched[0].name
      if (extra.value.first !== firstMenu) {
        extra.value.first = firstMenu
        handleTabClick(true)
      }
    })
    watch(() => $route.path, () => {
      const firstMenu = $route.matched.length !== 0 ? $route.matched[0].name : extra.value.first
      if (extra.value.first !== firstMenu) {
        extra.value.first = firstMenu
        handleTabClick(true)
      }
    })
    return {
      extra,
      theme,
      firstMenu,
      handleRoutes,
      translate,
      handleTabClick
    }
  }
}
</script>

<style lang="scss" scoped>
.element-nav {
  position: relative;
  height: $base-nav-height;
  padding-right: $base-padding;
  padding-left: $base-padding;
  overflow: hidden;
  user-select: none;
  background: $base-color-white;
  box-shadow: $base-box-shadow;

  .left-panel {
    display: flex;
    align-items: center;
    justify-items: center;
    height: $base-nav-height;

    :deep {
      .element-breadcrumb {
        margin-left: $base-margin;
      }

      .el-tabs {
        margin-left: $base-margin;

        .el-tabs__header {
          margin: 0;
        }

        .el-tabs__item {
          > div {
            display: flex;
            align-items: center;

            i {
              margin-right: 3px;
            }
          }
        }
      }

      .el-tabs__nav-wrap::after {
        display: none;
      }
    }
  }

  .right-panel {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: flex-end;
    height: $base-nav-height;
  }
}
</style>
