<template>
  <component :is="menuComponent" v-if="!item.hidden" :item-or-menu="itemOrMenu">
    <template v-if="item.children && item.children.length">
      <el-scrollbar
        v-if="
          (theme.layout === 'horizontal' && item.children.length > 18) ||
          (theme.layout !== 'horizontal' && collapse && item.children.length > 18)
        "
        style="height: 86vh"
      >
        <element-menu
          v-for="route in item.children"
          :key="route.path"
          :item="route"
        />
      </el-scrollbar>
      <template v-else>
        <element-menu
          v-for="route in item.children"
          :key="route.path"
          :item="route"
        />
      </template>
    </template>
  </component>
</template>

<script>
import { computed, ref, onMounted, getCurrentInstance } from 'vue'
export default {
  name: 'ElementMenu',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { $store } = getCurrentInstance().appContext.config.globalProperties
    const itemOrMenu = ref(props.item)
    const menuComponent = ref('MenuItem')
    const theme = computed(() => $store.state.settings.theme)
    const collapse = computed(() => $store.state.settings.collapse)
    const handleChildren = (children = []) => {
      if (!children) return []
      return children.filter((item) => {
        return item.hidden !== true
      })
    }
    onMounted(() => {
      const showChildren = handleChildren(props.item.children)
      if (showChildren.length) {
        if (showChildren.length === 1 && props.item.alwaysShow !== true) { itemOrMenu.value = props.item.children[0] } else menuComponent.value = 'Submenu'
      }
    })
    return {
      theme,
      collapse,
      itemOrMenu,
      menuComponent
    }
  }
}
</script>
