<template>
  <SvgIcon
    :icon-class="collapse ? 'menu-unfold-line' : 'menu-fold-line'"
    class="fold-unfold"
    @click="toggleCollapse"
  />
</template>

<script>
import { computed, getCurrentInstance } from 'vue'
export default {
  name: 'ElementFold',
  setup() {
    const { $store } = getCurrentInstance().appContext.config.globalProperties
    const collapse = computed(() => $store.state.settings.collapse)
    const toggleCollapse = () => {
      $store.dispatch('settings/toggleCollapse')
    }
    return {
      collapse,
      toggleCollapse
    }
  }
}
</script>

<style lang="scss" scoped>
.fold-unfold {
  color: $base-color-gray;
  cursor: pointer;
}
</style>
