<template>
  <!-- 横向布局 -->
  <div
    :class="{
      fixed: fixedHeader,
      'no-tabs-bar': !showTabs,
    }"
    class="element-layout-horizontal"
  >
    <div
      :class="{
        'fixed-header': fixedHeader,
      }"
      class="element-layout-header"
    >
      <element-header />
      <div
        v-show="showTabs"
        :class="{
          'element-tabs-horizontal': showTabs,
        }"
      >
        <div class="element-main">
          <element-tabs />
        </div>
      </div>
    </div>
    <div class="element-main main-padding">
      <element-content />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ElementLayoutHorizontal',
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
.element-layout-horizontal {
  :deep {
    .element-main {
      width: 100% !important;
      margin: auto;
    }
  }

  .element-tabs-horizontal {
    background: $base-color-white;
    box-shadow: $base-box-shadow;
  }

  .element-nav {
    .fold-unfold {
      display: none;
    }
  }
}
</style>
