<template>
  <div
    :class="{ fixed: fixedHeader, 'no-tabs-bar': !showTabs }"
    class="element-layout-column"
  >
    <hide-bar />
    <div
      class="element-main"
    >
      <div
        :class="{ 'fixed-header': fixedHeader }"
        class="element-layout-header"
      >
        <element-nav />
        <element-tabs v-show="showTabs"/>
      </div>
      <element-content/>
    </div>
  </div>
</template>

<script>
import HideBar from './components/HideBar'
export default {
  name: 'ElementLayoutHide',
  components: {
    HideBar
  },
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
    }
  }
}
</script>

<style lang="scss" scoped>
.element-layout-column {
  .element-main {
    .fixed-header {
      left: $base-left-menu-width;
      width: calc(100% - #{$base-left-menu-width});
    }
  }
}
</style>
