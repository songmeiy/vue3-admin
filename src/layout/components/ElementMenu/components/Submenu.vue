<template>
  <el-submenu
    ref="subMenu"
    :index="itemOrMenu.path"
    :title="translate('router', itemOrMenu.meta.title)"
  >
    <template #title>
      <SvgIcon
        v-if="itemOrMenu.meta && itemOrMenu.meta.isCustomSvg && itemOrMenu.meta.icon"
        :icon-class="itemOrMenu.meta.icon"
      />
      <i v-else-if="itemOrMenu.meta && itemOrMenu.meta.icon" :class="itemOrMenu"></i>
      <span :title="translate('router', itemOrMenu.meta.title)"  style="margin-left: 5px">
        {{ translate('router', itemOrMenu.meta.title) }}
      </span>
    </template>
    <slot />
  </el-submenu>
</template>

<script>
import { translate } from '@/utils/i18n'

export default {
  name: 'Submenu',
  props: {
    itemOrMenu: {
      type: Object,
      default() {
        return null
      }
    }
  },
  setup() {
    return {
      translate
    }
  }
}
</script>
