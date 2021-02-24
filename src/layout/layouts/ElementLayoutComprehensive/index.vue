<template>
  <!--综合布局 -->
  <div
    :class="{
      fixed: fixedHeader,
      'no-tabs-bar': !showTabs,
    }"
    class="element-layout-comprehensive"
  >
    <element-side-bar layout="comprehensive" />
    <div
      :class="{ 'is-collapse-main': collapse }"
      class="element-main"
    >
      <div
        :class="{ 'fixed-header': fixedHeader }"
        class="element-layout-header"
      >
        <element-nav layout="comprehensive" />
        <element-tabs v-show="showTabs" />
      </div>
      <element-content />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ElementLayoutComprehensive',
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
  }
}
</script>

<style lang="scss" scoped>
.element-layout-comprehensive {
  .fixed-header {
    left: $base-left-menu-width;
    width: $base-right-content-width;
  }
}
</style>
