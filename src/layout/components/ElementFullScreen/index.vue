<template>
  <el-tooltip
    v-if="theme.showFullScreen"
    placement="bottom"
    :effect="theme.themeName === 'white' ? 'dark' : 'light'"
    :content="translate('layout', isFullscreen === true ?'退出全屏' : '全屏')"
  >
    <SvgIcon
      :icon-class="isFullscreen ? 'fullscreen-exit-fill' : 'fullscreen-fill'"
      class="quick-button"
      :class="{ ['quick-button-' + theme.layout+ '-' +theme.themeName]: true }"
      @click="click"
    />
  </el-tooltip>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount, getCurrentInstance } from 'vue'
import screenfull from 'screenfull'
import { baseMessage } from '@/components/ElementPlus'
import { translate } from '@/utils/i18n'
export default {
  name: 'ElementFullScreen',
  emits: ['refresh'],
  setup(props, { emit }) {
    const isFullscreen = ref(false)
    const { $store } = getCurrentInstance().appContext.config.globalProperties
    const theme = computed(() => $store.state.settings.theme)
    const click = () => {
      if (!screenfull.isEnabled) {
        baseMessage(
          '开启全屏失败',
          'error',
          false,
          'element-hey-message-error'
        )
        return false
      }
      screenfull.toggle()
      emit('refresh')
    }
    const change = () => {
      isFullscreen.value = screenfull.isFullscreen
    }
    const init = () => {
      if (screenfull.isEnabled) {
        screenfull.on('change', change)
      }
    }
    const destroy = () => {
      if (screenfull.isEnabled) {
        screenfull.off('change', change)
      }
    }
    onBeforeUnmount(() => {
      destroy()
    })
    onMounted(() => {
      init()
    })
    return {
      theme,
      isFullscreen,
      click,
      translate
    }
  }
}
</script>
