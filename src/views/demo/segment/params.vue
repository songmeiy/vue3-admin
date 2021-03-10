<template>
  <div class="query-container">
    <el-alert type="success">注意看当前的路由</el-alert>
    <el-table
      :data="list"
      border
    >
      <el-table-column
        prop="key"
        width="auto"
        align="center"
        label="键"
      />
      <el-table-column
        prop="value"
        width="auto"
        align="center"
        label="值"
      />
    </el-table>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'DynamicSegmentParams',
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
