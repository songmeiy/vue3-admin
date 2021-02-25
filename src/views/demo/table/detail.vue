<template>
  <div class="detail-container">
    <el-page-header content="详情页面" @back="goBack" />
    <el-alert
      :closable="false"
      show-icon
      title=" 详情页菜单高亮，并缓存详情页，返回上一页再次打开可看到效果"
      type="success"
    />
    <el-form :inline="true" :model="form">
      <el-form-item label="输入框缓存">
        <el-input v-model="form.text" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getCurrentInstance, reactive } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'Detail',
  setup() {
    const $route = useRoute()
    const { $store, $router } = getCurrentInstance().appContext.config.globalProperties
    const form = reactive({
      text: ''
    })
    const goBack = async() => {
      await $store.dispatch('tabs/delVisitedRoute', $route.path)
      $router.push('/demo/table/comprehensive')
    }
    return {
      form,
      goBack
    }
  }
}
</script>
