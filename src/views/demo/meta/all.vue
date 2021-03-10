<template>
  <div class="all-hidden-container">
    <el-alert type="success">菜单里面没有这个Item，打开这个页面也不会出现在Tag标签里</el-alert>
    <el-alert type="error">你最好点击下面的按钮关闭这个页面，否则你会遇到神奇的现象</el-alert>
    <el-button @click="close">关闭此页</el-button>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'MetaAllHidden',
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
