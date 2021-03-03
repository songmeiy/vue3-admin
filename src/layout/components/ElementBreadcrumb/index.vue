<template>
  <el-breadcrumb v-show="theme.showBreadcrumb" class="element-breadcrumb" separator=">">
    <el-breadcrumb-item v-for="(item, index) in levelList.value" :key="index">
      <a @click.prevent="handleLink(item.redirect)">
        <SvgIcon v-if="item.meta && item.meta.icon && theme.showBreadcrumbIcon" :icon-class="item.meta.icon" />
        {{ translate('router', item.meta.title) }}
      </a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import { translate } from '@/utils/i18n'
import { watch, reactive, onMounted, computed, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'ElementBreadcrumb',
  setup() {
    const $route = useRoute()
    const { $store, $router } = getCurrentInstance().appContext.config.globalProperties
    const levelList = reactive({
      value: []
    })
    const theme = computed(() => $store.state.settings.theme)
    const getBreadcrumb = () => {
      return $route.matched.filter(
        (item) => item.meta && item.meta.title
      )
    }
    const handleLink = (redirect) => {
      $router.push(redirect)
    }
    watch(() => $route.path, () => {
      levelList.value = getBreadcrumb()
    })
    onMounted(() => {
      if (levelList.value.length === 0) {
        levelList.value = getBreadcrumb()
      }
    })
    return {
      levelList,
      theme,
      handleLink,
      translate
    }
  }
}
</script>

<style lang="scss" scoped>
.element-breadcrumb {
  height: $base-nav-height;
  font-size: $base-font-size-default;
  line-height: $base-nav-height;

  :deep(.el-breadcrumb__item) {
    .el-breadcrumb__inner {
      a {
        font-weight: normal;
        color: #515a6e;
      }
    }
    &:last-child {
      .el-breadcrumb__inner {
        a {
          color: #999;
        }
      }
    }
  }
}
</style>
