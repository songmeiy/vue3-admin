<template>
  <div>
    <el-button @click="notFondTest">404测试</el-button>
    <el-button @click="permissionTest">403测试</el-button>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue'
export default {
  name: 'Test',
  setup() {
    const { $router } = getCurrentInstance().appContext.config.globalProperties
    const notFondTest = () => {
      $router.push({ name: '404' })
    }
    const permissionTest = () => {
      $router.push({ name: '403' })
    }
    return {
      notFondTest,
      permissionTest
    }
  }
}
</script>

<style scoped>

</style>
