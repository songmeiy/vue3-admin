<template>
  <div>
    <el-button size="small" type="primary" @click="openMenuHidden">打开菜单隐藏页</el-button>
    <el-button size="small" type="primary" @click="openTagHidden">打开标签隐藏页</el-button>
    <el-button size="small" type="primary" @click="openAllHidden">菜单隐藏标签隐藏</el-button>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue'

export default {
  name: 'Meta',
  setup() {
    const { $router } = getCurrentInstance().appContext.config.globalProperties
    const openMenuHidden = () => {
      $router.push('/demo/meta/metaMenuHidden')
    }
    const openTagHidden = () => {
      $router.push('/demo/meta/metaTagHidden')
    }
    const openAllHidden = () => {
      $router.push('/demo/meta/metaAllHidden')
    }
    return {
      openAllHidden,
      openTagHidden,
      openMenuHidden
    }
  }
}
</script>

<style scoped>

</style>
