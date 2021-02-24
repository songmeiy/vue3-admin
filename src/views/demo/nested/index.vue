<template>
  <element-keep-alive />
</template>

<script>
export default {
  name: 'Nested'
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
