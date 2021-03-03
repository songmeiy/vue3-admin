<template>
  <el-menu-item
    :index="itemOrMenu.path"
    :class="{ 'is-active' : activeMenu === itemOrMenu.path }"
    :title="translate('router', itemOrMenu.meta.title)"
    @click="handleLink"
  >
    <svg-icon
      v-if="itemOrMenu.meta && itemOrMenu.meta.icon"
      :icon-class="itemOrMenu.meta.icon"
    />
    <span style="margin-left: 5px">{{ translate('router', itemOrMenu.meta.title) }}</span>
    <el-tag v-if="itemOrMenu.meta && itemOrMenu.meta.badge" effect="dark" type="danger">{{ itemOrMenu.meta.badge }}</el-tag>
    <span v-if="itemOrMenu.meta && itemOrMenu.meta.dot" class="element-dot element-dot-error"><span></span></span>
  </el-menu-item>
</template>

<script>
import { translate } from '@/utils/i18n'
import { isExternal } from '@/utils/validate'
import { computed, onBeforeMount, watch, ref, getCurrentInstance } from 'vue'
import { handleActivePath } from '@/utils/routes'
import { useRoute } from 'vue-router'
export default {
  name: 'MenuItem',
  props: {
    itemOrMenu: {
      type: Object,
      default() {
        return null
      }
    }
  },
  setup(props) {
    const $route = useRoute()
    const { $store, $router } = getCurrentInstance().appContext.config.globalProperties
    const activeMenu = ref('')
    const device = computed(() => $store.state.settings.device)
    const handleLink = async() => {
      const routePath = props.itemOrMenu.path
      const target = props.itemOrMenu.meta.target
      if (target === '_blank') {
        if (isExternal(routePath)) window.open(routePath)
        else if ($route.fullPath !== routePath) { window.open(routePath.href) }
      } else {
        if (isExternal(routePath)) window.location.href = routePath
        else if ($route.fullPath !== routePath) {
          if (device.value === 'mobile') $store.dispatch('settings/foldSideBar')
          await $router.push(routePath)
        }
      }
    }
    onBeforeMount(() => {
      activeMenu.value = handleActivePath($route)
    })
    watch(() => $route.path, () => {
      activeMenu.value = handleActivePath($route)
    })
    return {
      device,
      activeMenu,
      handleLink,
      translate
    }
  }
}
</script>

<style lang="scss" scoped>
:deep {
  .el-tag {
    float: right;
    height: 16px;
    padding-right: 4px;
    padding-left: 4px;
    margin-top: ($base-menu-item-height - 16) / 2;
    line-height: 16px;
    border: 0;
  }
}

.element-dot {
  float: right;
  margin-top: ($base-menu-item-height - 6) / 2 + 1;
}
</style>
