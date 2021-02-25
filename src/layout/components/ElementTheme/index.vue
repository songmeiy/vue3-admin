<template>
  <el-tooltip
    v-if="theme.showTheme"
    placement="bottom"
    :effect="theme.themeName === 'white' ? 'dark' : 'light'"
    :content="translate('theme', '主题')">
    <SvgIcon
      iconClass="theme"
      class="quick-button"
      :class="{ ['quick-button-' + theme.layout+ '-' +theme.themeName]: true }"
      @click="handleOpenTheme"
    />
  </el-tooltip>
</template>

<script>
import { computed, getCurrentInstance } from 'vue'
import { translate } from '@/utils/i18n'
export default {
  name: 'ElementTheme',
  setup() {
    const { $store, $baseEventBus } = getCurrentInstance().appContext.config.globalProperties
    const theme = computed(() => $store.state.settings.theme)
    const handleOpenTheme = () => {
      $baseEventBus.emit('openThemeDrawer')
    }
    return {
      theme,
      translate,
      handleOpenTheme
    }
  }
}
</script>
