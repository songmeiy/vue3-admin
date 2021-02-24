<template>
  <div class="nested-container">
    <el-alert :closable="false" title="多级路由-1-1-1-1" type="success">
      <el-input v-model="value" />
    </el-alert>
  </div>
</template>

<script>
export default {
  name: 'Nested1111',
  data() {
    return {
      value: ''
    }
  }
}
</script>

<style lang="scss" scoped>
:deep {
  .el-alert {
    padding: $base-padding;
    margin: 0 !important;
  }
}
</style>
