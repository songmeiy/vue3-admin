<template>
  <div class="container">
    <el-divider content-position="left">加载层</el-divider>
    <pre v-highlight>
      <code>
/**
 * @description 全局加载层
 * @author WangZeping zepingwong@gmail.com
 * @param {*} index
 * @param {*} text
 */
        function baseLoading(index, text = loadingText)
      </code>
    </pre>
    <el-button @click="openBaseLoading(false)">打开默认加载层</el-button>
    <el-button @click="openBaseLoading(1)">打开加载层1</el-button>
    <el-button @click="openBaseLoading(2)">打开加载层2</el-button>
    <el-button @click="openBaseLoading(3)">打开加载层3</el-button>
    <el-button @click="openBaseLoading(4)">打开加载层4</el-button>
    <el-button @click="openBaseLoading(5)">打开加载层5</el-button>
    <el-button @click="openBaseLoading(6)">打开加载层6</el-button>
    <el-button @click="openBaseLoading(7)">打开加载层7</el-button>
    <el-button @click="openBaseLoading(8)">打开加载层8</el-button>
    <el-button @click="openBaseLoading(9)">打开加载层9</el-button>
    <el-divider content-position="left">封装</el-divider>
    <pre v-highlight>
      <code>
/**
 * @description 全局多彩加载层
 * @author WangZeping zepingwong@gmail.com
 * @param {*} index
 * @param {*} text
 */
        function baseColorfullLoading(index, text = loadingText)
      </code>
    </pre>
    <el-button @click="openBaseColorfullLoading(false)">打开默认加载层</el-button>
    <el-button @click="openBaseColorfullLoading(1)">打开加载层1</el-button>
    <el-button @click="openBaseColorfullLoading(2)">打开加载层2</el-button>
    <el-button @click="openBaseColorfullLoading(3)">打开加载层3</el-button>
    <el-button @click="openBaseColorfullLoading(4)">打开加载层4</el-button>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue'
export default {
  name: 'ElementPlusLoading',
  setup() {
    const { $baseLoading, $baseColorfullLoading } = getCurrentInstance().appContext.config.globalProperties
    const openBaseLoading = (index) => {
      const loadingInstance = $baseLoading(index, index ? '我是加载层' + index : '我是默认加载层')
      setTimeout(() => {
        loadingInstance.close()
      }, 2000)
    }
    const openBaseColorfullLoading = (index) => {
      const loadingInstance = $baseColorfullLoading(index, index ? '我是多彩加载层' + index : '我是默认加载层')
      setTimeout(() => {
        loadingInstance.close()
      }, 2000)
    }
    return {
      openBaseLoading,
      openBaseColorfullLoading
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
  text-align: left;
}
</style>
