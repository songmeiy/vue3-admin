<template>
  <div class="dynamic-meta-container">
    <el-row :gutter="20">
      <el-col :lg="8" :md="12" :sm="24" :xl="8" :xs="24">
        <el-card shadow="hover">
          <template #header>
            <span>动态标题</span>
          </template>
          <el-button @click="handleMeta('DynamicMeta', { title: 'demo' })">
            标题变更为 demo
          </el-button>
          <el-button @click="handleMeta('DynamicMeta', { title: '动态Meta' })">
            还原为默认标题
          </el-button>
        </el-card>
      </el-col>
      <el-col :lg="8" :md="12" :sm="24" :xl="8" :xs="24">
        <el-card shadow="hover">
          <template #header>
            <span>动态徽章</span>
          </template>
          <el-button @click="handleBadge('DynamicMeta')">徽章+ 1</el-button>
          <el-button @click="resetBadge('DynamicMeta', { badge: '0' })">
            徽章清零
          </el-button>
          <el-button @click="resetBadge('DynamicMeta', { badge: false })">
            移除徽章
          </el-button>
        </el-card>
      </el-col>
      <el-col :lg="8" :md="12" :sm="24" :xl="8" :xs="24">
        <el-card shadow="hover">
          <template #header>
            <span>动态图标</span>
          </template>
          <el-popover
            popper-class="icon-selector-popper"
            trigger="hover"
            width="292"
          >
            <template #reference>
              <el-button>
                <svg-icon :icon="icon" />
                修改图标
                <svg-icon icon="arrow-down-s-line" />
              </el-button>
            </template>
            <element-icon-selector @handle-icon="handleIcon" />
          </el-popover>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import getPageTitle from '@/utils/pageTitle'
import ElementIconSelector from '@/components/ElementIconSelector'
import { useRoute } from 'vue-router'
import { getCurrentInstance, ref } from 'vue'
export default {
    name: 'DynamicMeta',
  components: { ElementIconSelector },
  setup() {
    const { $store } = getCurrentInstance().appContext.config.globalProperties
    const $route = useRoute()
    const badge = ref(0)
    const icon = ref($route.meta.icon)
    const changeMenuMeta = (meta) => {
      $store.dispatch('routes/changeMenuMeta', meta)
    }
    const changeTabsMeta = (meta) => {
      $store.dispatch('tabs/changeTabsMeta', meta)
    }
    const handleBadge = (name) => {
      badge.value = badge.value * 1 + 1
      changeMenuMeta({
        name,
        meta: { badge }
      })
    }
    const resetBadge = (name, meta) => {
      badge.value = 0
      changeMenuMeta({ name, meta })
    }
    const handleMeta = (name, meta) => {
      console.log(meta)
      if (meta.title) getPageTitle(meta.title)
      changeMenuMeta({ name, meta })
      changeTabsMeta({ name, meta })
    }
    const handleIcon = (item) => {
      icon.value = item
      changeMenuMeta({ name: 'DynamicMeta', meta: { icon: item }})
      changeTabsMeta({ name: 'DynamicMeta', meta: { icon: item }})
    }
    return {
      icon,
      handleBadge,
      handleIcon,
      handleMeta,
      resetBadge
    }
  }
}
</script>
