<template>
  <!--常规布局 -->
  <div
    :class="{ fixed: fixedHeader, 'no-tabs-bar': !showTabs }"
    class="element-layout-common"
  >
    <div
      :class="{ 'fixed-header': fixedHeader }"
      class="element-layout-header"
    >
      <element-header layout="common" />
      <div>
        <element-side-bar layout="common" />
        <!-- tabs -->
        <div
          v-show="showTabs"
          :class="{ 'is-collapse-main': collapse }"
          class="element-main"
        >
          <element-tabs layout="common" />
        </div>
        <!-- tabs -->
      </div>
    </div>
    <!-- main -->
    <div
      :class="{ 'is-collapse-main': collapse }"
      class="element-main main-padding"
    >
      <element-content />
    </div>
    <!-- main -->
  </div>
</template>

<script>
export default {
  name: 'ElementLayoutCommon',
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
.element-layout-common {
  .element-main {
    .fixed-header {
      left: $base-left-menu-width;
      width: $base-right-content-width;
    }
  }

  :deep {
    .element-tabs-content {
      width: calc(
        100% - 60px - #{$base-font-size-default} - #{$base-padding} - 2px
      ) !important;
    }

    .element-header {
      .element-main {
        width: 100%;
        margin: auto 0;
      }
    }
  }
}
</style>
