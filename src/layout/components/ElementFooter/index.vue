<template>
  <footer class="element-footer">
    Copyright
    <SvgIcon :iconClass="'copyright'" />
    {{ system.websiteTitle }} {{ fullYear }} by {{ system.copyright }}
  </footer>
</template>

<script>
import { computed, getCurrentInstance } from 'vue'
export default {
  name: 'ElementFooter',
  data() {
    const { $store } = getCurrentInstance().appContext.config.globalProperties
    const system = computed(() => $store.state.settings.system)
    return {
      fullYear: new Date().getFullYear(),
      system
    }
  }
}
</script>

<style lang="scss" scoped>
.element-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 55px;
  padding: 0 $base-padding 0 $base-padding;
  color: rgba(0, 0, 0, 0.45);
  background: $base-color-white;
  border-top: 1px dashed $base-border-color;

  i {
    margin: 0 5px;
  }
}
</style>
