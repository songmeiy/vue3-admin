<template>
  <el-submenu
    ref="subMenu"
    :index="itemOrMenu.path"
  >
    <template #title>
      <SvgIcon
        v-if="itemOrMenu.meta && itemOrMenu.meta.icon"
        :iconClass="itemOrMenu.meta.icon"
        :title="translate('router', itemOrMenu.meta.title)"
      />
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
