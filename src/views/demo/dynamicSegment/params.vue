<template>
  <div class="query-container">
    <el-alert type="success">注意看当前的路由</el-alert>
    <el-row :gutter="20">
      <el-col :lg="6" :md="6" :sm="6" :xl="6" :xs="12">键</el-col>
      <el-col :lg="6" :md="6" :sm="6" :xl="6" :xs="12">值</el-col>
    </el-row>
    <el-row v-for="item in list" :key="item.key" :gutter="20">
      <el-col :lg="6" :md="6" :sm="6" :xl="6" :xs="12"><span>{{ item.key }}</span></el-col>
      <el-col :lg="6" :md="6" :sm="6" :xl="6" :xs="12"><span>{{ item.value }}</span></el-col>
    </el-row>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'DynamicSegmentParam',
  setup() {
    const $route = useRoute()
    const list = ref([])
    onMounted(() => {
      const params = $route.params
      Object.keys(params).forEach((key) => {
        list.value.push({ key: key, value: params[key] })
      })
    })
    return {
      list
    }
  }
}
</script>

<style scoped>

</style>
