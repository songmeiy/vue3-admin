<template>
  <div class="container">
    <el-divider content-position="left">baseAlert</el-divider>
    <pre v-highlight>
      <code>
/**
 * @description 全局Alert
 * @author WangZeping zepingwong@gmail.com
 * @param {*} content
 * @param {*} title
 * @param {*} type success/warning/info/error
 * @param confirmButtonText
 * @param {function} callback
 */
        function baseAlert(
          content,
          title = 'message.component.提示',
          type = 'info',
          confirmButtonText = 'message.component.确定',
          callback = function() {}
        )
      </code>
    </pre>
    <el-button @click="open1">打开Alert弹窗</el-button>
    <el-divider content-position="left">baseConfirm</el-divider>
    <pre v-highlight>
      <code>
/**
 * @description 全局Confirm
 * @author WangZeping zepingwong@gmail.com
 * @param {*} content
 * @param {*} title
 * @param {*} callback1
 * @param {*} callback2
 * @param {*} confirmButtonText
 * @param {*} cancelButtonText
 * @param {*} type
 */
        function baseConfirm(
          content,
          title = 'message.component.提示',
          callback1 = function() {},
          callback2 = function() {},
          confirmButtonText = 'message.component.确定',
          cancelButtonText = 'message.component.取消',
          type = 'info'
        ) {}
      </code>
    </pre>
    <el-button @click="open2">打开Confirm弹窗</el-button>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue'
export default {
  name: 'ElementPlusMessageBox',
  setup() {
    const { $baseAlert, $baseConfirm } = getCurrentInstance().appContext.config.globalProperties
    const open1 = () => {
      $baseAlert('这是一条提示消息')
    }
    const open2 = () => {
      $baseConfirm('这是一条提示消息')
    }
    return {
      open1,
      open2
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
