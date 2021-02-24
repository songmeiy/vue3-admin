<template>
  <div class="element-tabs">
    <element-fold v-if="layout === 'common'" />
    <el-tabs
      v-model="tabActive"
      :class="{ ['element-tabs-content-' + theme.tabsBarStyle]: true, }"
      class="element-tabs-content"
      type="card"
      @tab-click="handleTabClick"
      @tab-remove="handleTabRemove"
    >
      <el-tab-pane
        v-for="item in visitedRoutes"
        :key="item.path"
        :closable="!isAffix(item)"
        :name="item.path"
      >
        <!--  vue 3.0写法 -->
        <template #label>
          <SvgIcon
            v-if="item.meta && item.meta.icon && theme.showTabsBarIcon"
            :iconClass="item.meta.icon"
          />
          {{ translate('router', item.meta.title) }}
        </template>
      </el-tab-pane>
    </el-tabs>

    <el-dropdown @command="handleCommand" @visible-change="handleVisibleChange">
      <span class="more">
        {{ translate('layout', '更多') }}
        <SvgIcon
          class="element-dropdown"
          :iconClass ="'triangle-open'"
          :className ="active? 'open' : ''"
        />
      </span>
      <template #dropdown>
        <el-dropdown-menu class="tabs-more">
          <el-dropdown-item command="closeOthersTabs">
            <SvgIcon :iconClass="'close-line'" />
            {{ translate('layout', '关闭其他') }}
          </el-dropdown-item>
          <el-dropdown-item command="closeLeftTabs">
            <SvgIcon :iconClass="'arrow-left-line'" />
            {{ translate('layout', '关闭左侧') }}
          </el-dropdown-item>
          <el-dropdown-item command="closeRightTabs">
            <SvgIcon :iconClass="'arrow-right-line'" />
            {{ translate('layout', '关闭右侧') }}
          </el-dropdown-item>
          <el-dropdown-item command="closeAllTabs">
            <SvgIcon :iconClass="'close-line'" />
            {{ translate('layout', '关闭全部') }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { translate } from '@/utils/i18n'
import { handleActivePath } from '@/utils/routes'
import { computed, ref, watch, onBeforeMount, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'ElementTabs',
  props: {
    layout: {
      type: String,
      default: ''
    }
  },
  setup() {
    const $route = useRoute()
    const { $store, $router } = getCurrentInstance().appContext.config.globalProperties
    const active = ref(false)
    const tabActive = ref('')
    const affixTabs = ref([])
    const theme = computed(() => $store.state.settings.theme)
    const routes = computed(() => $store.state.routes.routes)
    const visitedRoutes = computed(() => $store.state.tabs.visitedRoutes)
    /**
     * @description 标签点击事件
     */
    const handleTabClick = (tab) => {
      if (!isActive(tab.props.name)) $router.push(visitedRoutes.value[tab.index])
    }
    const handleVisibleChange = (val) => {
      active.value = val
    }
    /**
     * 初始化Tab
     * */
    const initAffixTabs = (routes) => {
      routes.forEach((route) => {
        if (route.meta && route.meta.affix) addTabs(route, true)
        if (route.children) initAffixTabs(route.children)
      })
    }
    /**
     * 添加标签页
     * @param tag route
     * @param init 是否从路由中获取
     * @returns {Promise<void>}
     */
    const addTabs = async(tag, init = false) => {
      let parentIcon = ''
      if (tag.matched && tag.matched.length > 1) {
        parentIcon = tag.matched[1].meta.icon
      }
      if (tag.name && tag.meta && tag.meta.tabHidden !== true) {
        const path = handleActivePath(tag, true)
        await $store.dispatch('tabs/addVisitedRoute', {
          path: path,
          query: tag.query,
          params: tag.params,
          name: tag.name,
          matched: init ? [tag.name] : tag.matched.map((item) => item.name),
          parentIcon,
          meta: { ...tag.meta }
        })
        tabActive.value = path
      } else {
        if (tag.meta.tabHidden) {
          tabActive.value = ''
        }
      }
    }
    /**
     * 根据原生路径删除标签中的标签
     * @param rawPath 原生路径
     * @returns {Promise<void>}
     */
    const handleTabRemove = async(rawPath) => {
      await $store.dispatch('tabs/delVisitedRoute', rawPath)
      if (isActive(rawPath)) toLastTag()
    }
    const handleCommand = async(command) => {
      switch (command) {
          case 'closeOthersTabs':
            /**
             * 删除其他标签页
             * @returns {Promise<void>}
             */
            await $store.dispatch('tabs/delOthersVisitedRoutes', handleActivePath($route, true))
            break
          case 'closeLeftTabs':
            /**
             * 删除左侧标签页
             * @returns {Promise<void>}
             */
            await $store.dispatch('tabs/delLeftVisitedRoutes', handleActivePath($route, true))
            break
          case 'closeRightTabs':
            /**
             * 删除右侧标签页
             * @returns {Promise<void>}
             */
            await $store.dispatch('tabs/delRightVisitedRoutes', handleActivePath($route, true))
            break
          case 'closeAllTabs':
            /**
             * 删除所有标签页
             * @returns {Promise<void>}
             */
            await $store.dispatch('tabs/delAllVisitedRoutes')
            if (
              !affixTabs.value.some((tag) =>
                isActive(handleActivePath(tag, true))
              )
            ) { toLastTag() }
            break
      }
    }
    /**
     * 跳转最后一个标签页
     */
    const toLastTag = () => {
      const latestView = visitedRoutes.value.slice(-1)[0]
      if (latestView) $router.push(latestView.path)
      else $router.push('/')
    }
    const isActive = (path) => {
      return path === handleActivePath($route, true)
    }
    const isAffix = (tag) => {
      return tag.meta && tag.meta.affix
    }
    watch(() => $route.path, () => {
      addTabs($route)
    })
    onBeforeMount(() => {
      initAffixTabs(routes.value)
      if (!isAffix($route)) {
        addTabs($route)
      }
    })
    return {
      theme,
      active,
      tabActive,
      visitedRoutes,
      isAffix,
      handleCommand,
      handleTabRemove,
      translate,
      handleTabClick,
      handleVisibleChange
    }
  }
}
</script>

<style lang="scss" scoped>
.open {
  transform: rotate(180deg);
}
.element-tabs {
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  height: $base-tabs-height;
  padding-right: $base-padding;
  padding-left: $base-padding;
  user-select: none;
  background: $base-color-white;
  border-top: 1px solid #f6f6f6;

  ::v-deep {
    .fold-unfold {
      margin-right: $base-margin;
    }
  }

  .element-tabs-content {
    width: calc(100% - 60px);

    &-card {
      height: $base-tag-item-height;

      ::v-deep {
        .el-tabs__nav-next,
        .el-tabs__nav-prev {
          height: $base-tag-item-height;
          line-height: $base-tag-item-height;
        }

        .el-tabs__header {
          border-bottom: 0;

          .el-tabs__nav {
            border: 0;
          }

          .el-tabs__item {
            box-sizing: border-box;
            height: $base-tag-item-height;
            margin-right: 5px;
            line-height: $base-tag-item-height;
            border: 1px solid $base-border-color;
            border-radius: $base-border-radius;
            transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;

            &.is-active {
              color: $base-color-blue;
              background: mix($base-color-white, $base-color-blue, 90%);
              border: 1px solid $base-color-blue;
            }

            &:hover {
              border: 1px solid $base-color-blue;
            }
          }
        }
      }
    }

    &-smart {
      height: $base-tag-item-height;

      ::v-deep {
        .el-tabs__nav-next,
        .el-tabs__nav-prev {
          height: $base-tag-item-height;
          line-height: $base-tag-item-height;
        }

        .el-tabs__header {
          border-bottom: 0;

          .el-tabs__nav {
            border: 0;
          }

          .el-tabs__item {
            height: $base-tag-item-height;
            margin-right: 5px;
            line-height: $base-tag-item-height;
            border: 0;
            transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;

            &.is-active {
              background: mix($base-color-white, $base-color-blue, 90%);

              &:after {
                width: 100%;
                transition: $base-transition;
              }
            }

            &:after {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 0;
              height: 2px;
              content: '';
              background-color: $base-color-blue;
              transition: $base-transition;
            }

            &:hover {
              background: mix($base-color-white, $base-color-blue, 90%);

              &:after {
                width: 100%;
                transition: $base-transition;
              }
            }
          }
        }
      }
    }

    &-smooth {
      height: $base-tag-item-height + 4;

      ::v-deep {
        .el-tabs__nav-next,
        .el-tabs__nav-prev {
          height: $base-tag-item-height + 4;
          line-height: $base-tag-item-height + 4;
        }

        .el-tabs__header {
          border-bottom: 0;

          .el-tabs__nav {
            border: 0;
          }

          .el-tabs__item {
            height: $base-tag-item-height + 4;
            padding: 0 30px 0 30px;
            margin-top: ($base-tabs-height - $base-tag-item-height - 4)/2;
            margin-right: -18px;
            line-height: $base-tag-item-height + 4;
            text-align: center;
            border: 0;
            transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;

            &.is-active {
              padding: 0 30px 0 30px;
              color: $base-color-blue;
              background: mix($base-color-white, $base-color-blue, 90%);
              mask: url('~@/assets/tabs_images/element-tab.png');
              mask-size: 100% 100%;

              &:hover {
                padding: 0 30px 0 30px;
                color: $base-color-blue;
                background: mix($base-color-white, $base-color-blue, 90%);
                mask: url('~@/assets/tabs_images/element-tab.png');
                mask-size: 100% 100%;
              }
            }

            &:hover {
              padding: 0 30px 0 30px;
              color: $base-color-black;
              background: #dee1e6;
              mask: url('~@/assets/tabs_images/element-tab.png');
              mask-size: 100% 100%;
            }
          }
        }
      }
    }
  }

  .more {
    display: flex;
    align-content: center;
    align-items: center;
    cursor: pointer;
  }
}
</style>
