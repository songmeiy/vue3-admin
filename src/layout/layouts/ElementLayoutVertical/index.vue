<template>
  <!-- 纵向布局 -->
  <div
    :class="{ fixed: fixedHeader,'no-tabs-bar': !showTabs }"
    class="element-layout-vertical"
  >
    <element-side-bar />
    <div
      v-if="device === 'mobile' && !collapse"
      class="v-modal"
      @click="handleFoldSideBar"
    />
    <div
      :class="{ 'is-collapse-main': collapse }"
      class="element-main"
    >
      <div
        :class="{ 'fixed-header': fixedHeader }"
        class="element-layout-header"
      >
        <element-nav />
        <element-tabs v-show="showTabs" />
      </div>
      <element-content />
    </div>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue'

export default {
  name: 'ElementLayoutVertical',
  props: {
    collapse: {
      type: Boolean,
      default() {
        return false
      }
    },
    fixedHeader: {
      type: Boolean,
      default() {
        return true
      }
    },
    showTabs: {
      type: Boolean,
      default() {
        return true
      }
    },
    device: {
      type: String,
      default() {
        return 'desktop'
      }
    }
  },
  setup() {
    const { $store } = getCurrentInstance().appContext.config.globalProperties
    const handleFoldSideBar = () => {
      $store.dispatch('settings/foldSideBar')
    }
    return {
      handleFoldSideBar
    }
  }
}
</script>

<style lang="scss" scoped>
.element-layout-vertical {
  .fixed-header {
    left: $base-left-menu-width;
    width: $base-right-content-width;
  }
}
</style>
