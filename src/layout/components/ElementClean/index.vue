<template>
  <span v-if="theme.showClean">
    <el-tooltip placement="bottom" :effect="theme.themeName === 'white' ? 'dark' : 'light'" :content="translate('layout', '清除缓存')">
      <SvgIcon
        icon-class="clean"
        class="quick-button"
        :class="{ ['quick-button-' + theme.layout+ '-' +theme.themeName]: true }"
        @click="clean"
      />
  </el-tooltip>
  </span>
</template>

<script>
import { computed, getCurrentInstance } from 'vue'
import { translate } from '@/utils/i18n'
export default {
  name: 'ElementClean',
  setup() {
    const { $store } = getCurrentInstance().appContext.config.globalProperties
    const theme = computed(() => $store.state.settings.theme)
    const clean = () => {
      localStorage.clear()
      location.reload()
    }
    return {
      theme,
      clean,
      translate
    }
  }
}
</script>
<style lang="scss">
.el-autocomplete {
  width: 100%;
}
</style>
<style lang="scss" scoped>
::v-deep {
  .el-dialog {
    &__header {
      display: none;
      border: 0 !important;
    }

    &__body {
      padding: 0;
      border: 0 !important;
    }

    .el-form-item__content {
      position: relative;

      i {
        position: absolute;
        top: 14px;
        left: $base-margin/1.5;
      }
    }
  }
}
</style>
