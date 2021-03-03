<template>
  <div class="callback-container" />
</template>

<script>
import { callback } from '@/utils/social'
import { ref, onBeforeUnmount, getCurrentInstance } from 'vue'
export default {
  name: 'Callback',
  setup() {
    const { $baseLoading } = getCurrentInstance().appContext.config.globalProperties
    const loading = ref(null)
    loading.value = $baseLoading(1)
    callback()
    window.close()
    onBeforeUnmount(() => {
      loading.value.close()
    })
  }
}
</script>
