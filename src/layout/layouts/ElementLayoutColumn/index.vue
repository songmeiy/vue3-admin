<template>
  <!--分栏布局 -->
  <div
    :class="{ fixed: fixedHeader, 'no-tabs-bar': !showTabs }"
    class="element-layout-column"
  >
    <column-bar />
    <div
      :class="{ ['element-main-' + theme.columnStyle]: true, 'is-collapse-main': collapse }"
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
import { computed, getCurrentInstance } from 'vue'
import ColumnBar from './components/ColumnBar'
export default {
  name: 'ElementLayoutColumn',
  components: {
    ColumnBar
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
  },
  setup() {
    const { $store } = getCurrentInstance().appContext.config.globalProperties
    const theme = computed(() => $store.state.settings.theme)
    return {
      theme
    }
  }
}
</script>

<style lang="scss" scoped>
.element-layout-column {
  .element-main {
    .fixed-header {
      left: $base-left-menu-width;
      width: $base-right-content-width;
    }

    &.is-collapse-main {
      &.element-main-horizontal {
        margin-left: $base-left-menu-width-min * 1.3;

        :deep(.fixed-header ) {
          left: $base-left-menu-width-min * 1.3;
          width: calc(100% - #{$base-left-menu-width-min} * 1.3);
        }
      }
    }
  }
}
</style>
