<template>
  <div class="tag-hidden-container">
    <el-alert type="success">打开这个页面，但是Tag里面没有这个标签</el-alert>
    <el-alert type="error">你最好点击下面的按钮关闭这个页面，否则你会遇到神奇的现象</el-alert>
    <el-button @click="close">关闭此页</el-button>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'MetaTagHidden',
  setup() {
    const $route = useRoute()
    const { $store, $router } = getCurrentInstance().appContext.config.globalProperties
    const close = async() => {
      await $store.dispatch('tabs/delVisitedRoute', $route.path)
      $router.push('/demo/meta/index')
    }
    return {
      close
    }
  }
}
</script>

<style scoped>

</style>
