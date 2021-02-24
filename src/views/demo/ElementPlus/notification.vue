<template>
  <div class="container">
    <el-divider content-position="left">原生</el-divider>
    <el-button @click="open1">可自动关闭</el-button>
    <el-button @click="open2">不会自动关闭</el-button>
    <el-button @click="open3">成功</el-button>
    <el-button @click="open4">警告</el-button>
    <el-button @click="open5">信息</el-button>
    <el-button @click="open6">错误</el-button>
    <el-divider content-position="left">封装</el-divider>
    <pre v-highlight>
      <code>
/**
 * @description 全局Notification
 * @author WangZeping zepingwong@gmail.com
 * @param {*} message
 * @param {*} title
 * @param {*} type success || warning || info || error
 * @param {*} position top-right || top-left || bottom-right || bottom-left
 * @param {*} close true || false
 * @param onClose () => {}
 * @param onClick () => {}
 */
        function baseNotify(
          message, title, type = 'info',
          position = 'top-right',
          close = true,
          onClose = () => {},
          onClick = () => {}
        ) {}
      </code>
    </pre>
    <el-button @click="open7">可自动关闭</el-button>
    <el-button @click="open8">不会自动关闭</el-button>
    <el-button @click="open9">成功</el-button>
    <el-button @click="open10">警告</el-button>
    <el-button @click="open11">信息</el-button>
    <el-button @click="open12">错误</el-button>
  </div>
</template>

<script>
import { getCurrentInstance, h } from 'vue'
export default {
  name: 'ElementPlusNotification',
  setup() {
    const { $baseNotify, $notify } = getCurrentInstance().appContext.config.globalProperties
    const open1 = () => {
      $notify({ title: '标题名称', message: h('i', { style: 'color: teal' }, '这是一条会自动关闭的消息') })
    }
    const open2 = () => {
      $notify({ title: '标题名称', message: '这是一条不会自动关闭的消息', duration: 0 })
    }
    const open3 = () => {
      $notify({ title: '成功', message: '这是一条成功的提示消息', type: 'success' })
    }
    const open4 = () => {
      $notify({ title: '警告', message: '这是一条警告的提示消息', type: 'warning' })
    }
    const open5 = () => {
      $notify({ title: '消息', message: '这是一条一般的提示消息', type: 'info' })
    }
    const open6 = () => {
      $notify({ title: '错误', message: '这是一条错误的提示消息', type: 'error' })
    }
    const open7 = () => {
      $baseNotify('这是一条会自动关闭的消息', '标题名称', 'info', 'top-right', true)
    }
    const open8 = () => {
      $baseNotify('这是一条不会自动关闭的消息', '标题名称', 'info', 'top-right', false)
    }
    const open9 = () => {
      $baseNotify('这是一条成功的提示消息', '成功', 'success')
    }
    const open10 = () => {
      $baseNotify('这是一条警告的提示消息', '警告', 'warning')
    }
    const open11 = () => {
      $baseNotify('这是一条一般的提示消息', '信息', 'info')
    }
    const open12 = () => {
      $baseNotify('这是一条错误的提示消息', '错误', 'error')
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
      open12
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
