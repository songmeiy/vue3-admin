<template>
  <el-dropdown v-if="theme.showLanguage" @command="handleCommand">
    <SvgIcon
      :iconClass="'translate'"
      class="quick-button"
      :class="{ ['quick-button-' + theme.layout+ '-' +theme.themeName]: true }"
    />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="zh-cn" :disabled="system.language === 'zh-cn'">中文简体</el-dropdown-item>
        <el-dropdown-item command="en" :disabled="system.language === 'en'">English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { computed, getCurrentInstance } from 'vue'
export default {
  name: 'ElementLanguage',
  setup() {
    const { $store } = getCurrentInstance().appContext.config.globalProperties
    const theme = computed(() => $store.state.settings.theme)
    const system = computed(() => $store.state.settings.system)
    const handleCommand = (command) => {
      $store.dispatch('settings/changeLanguage', command)
    }
    return {
      theme,
      system,
      handleCommand
    }
  }
}
</script>
