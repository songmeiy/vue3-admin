<template>
  <div class="container">
    <el-divider content-position="left">原生</el-divider>
    <el-button @click="open1">打开提示消息</el-button>
    <el-button @click="open2">VNode</el-button>
    <el-button @click="open3">成功</el-button>
    <el-button @click="open4">警告</el-button>
    <el-button @click="open5">信息</el-button>
    <el-button @click="open6">错误</el-button>
    <el-button @click="open7">可关闭的消息</el-button>
    <el-button @click="open8">文字居中</el-button>
    <el-button @click="open9">HTML片段</el-button>
    <el-divider content-position="left">封装</el-divider>
    <pre v-highlight>
      <code>
/**
 * @description 全局Message
 * @author WangZeping zepingwong@gmail.com
 * @param {*} message
 * @param {*} type
 * @param {*} dangerouslyUseHTMLString
 * @param {*} customClass element-hey-message-success/warning/info/error
 * @param {*} center
 * @param {*} close
 */
        function baseMessage(
          message,
          type,
          dangerouslyUseHTMLString = false,
          customClass = '',
          center = false,
          close = true
        )
      </code>
    </pre>
    <el-button @click="open10">成功</el-button>
    <el-button @click="open11">警告</el-button>
    <el-button @click="open12">信息</el-button>
    <el-button @click="open13">错误</el-button>
    <el-button @click="open14">成功</el-button>
    <el-button @click="open15">警告</el-button>
    <el-button @click="open16">信息</el-button>
    <el-button @click="open17">错误</el-button>
  </div>
</template>

<script>
import { getCurrentInstance, h } from 'vue'
export default {
  name: 'ElementPlusMessage',
  setup() {
    const { $message, $baseMessage } = getCurrentInstance().appContext.config.globalProperties
    const open1 = () => {
      $message('只是一条消息')
    }
    const open2 = () => {
      $message({
        message: h('p', null, [
          h('span', null, '内容可以是 '),
          h('i', { style: 'color: teal' }, 'VNode')
        ])
      })
    }
    const open3 = () => {
      $message({ message: '恭喜你，这是一条成功消息', type: 'success' })
    }
    const open4 = () => {
      $message({ message: '这是一条警告的提示消息', type: 'warning' })
    }
    const open5 = () => {
      $message({ message: '这是一条一般的提示消息', type: 'info' })
    }
    const open6 = () => {
      $message({ message: '这是一条错误的提示消息', type: 'error' })
    }
    const open7 = () => {
      $message({ showClose: true, message: '这是一条可以关闭的消息提示' })
    }
    const open8 = () => {
      $message({ message: '居中的文字', center: true })
    }
    const open9 = () => {
      $message({ dangerouslyUseHTMLString: true, message: '<strong>这是 <i>HTML</i> 片段</strong>' })
    }
    const open10 = () => {
      $baseMessage('这是一条成功的提示消息', 'success')
    }
    const open11 = () => {
      $baseMessage('这是一条警告的提示消息', 'warning')
    }
    const open12 = () => {
      $baseMessage('这是一条一般的提示消息', 'info')
    }
    const open13 = () => {
      $baseMessage('这是一条错误的提示消息', 'error')
    }
    const open14 = () => {
      $baseMessage('这是一条成功的提示消息', 'success', false, 'element-hey-message-success')
    }
    const open15 = () => {
      $baseMessage('这是一条警告的提示消息', 'warning', false, 'element-hey-message-warning')
    }
    const open16 = () => {
      $baseMessage('这是一条一般的提示消息', 'info', false, 'element-hey-message-info')
    }
    const open17 = () => {
      $baseMessage('这是一条错误的提示消息', 'error', false, 'element-hey-message-error')
    }
    return {
      open1,
      open2,
      open3,
      open4,
      open5,
      open6,
      open7,
      open8,
      open9,
      open10,
      open11,
      open12,
      open13,
      open14,
      open15,
      open16,
      open17
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
