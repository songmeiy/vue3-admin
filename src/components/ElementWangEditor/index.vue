<template>
  <div class="wangeditor">
    <div ref='editor'></div>
    <div class="under-edit-slot">
      <slot name="under-edit-slot"></slot>
    </div>
    <el-dialog
      v-model="syncHTMLVisable"
      :model-value="syncHTMLVisable"
      width="100%"
      title="HTML预览"
      top="0">
      <el-scrollbar>
        <div :innerHTML='content.html'></div>
      </el-scrollbar>
    </el-dialog>
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref, reactive, getCurrentInstance } from 'vue'
import WangEditor from 'wangeditor'
import { deleteImage } from './api'
import { useWangEditor } from './useWangEditor'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import defaultConfig from '@/config'
const { BtnMenu } = WangEditor
const content = reactive({
  html: '',
  text: ''
})

const syncHTMLVisable = ref(false)
// 第一，菜单 class ，Button 菜单继承 BtnMenu class
class syncHTMLMenu extends BtnMenu {
  constructor(editor) {
    const $elem = WangEditor.$(`<div class="w-e-menu" data-title="预览"><i class="el-icon-view"></i></div>`)
    super($elem, editor)
  }
  // 菜单点击事件
  clickHandler() {
    content.html = this.editor.txt.html()
    syncHTMLVisable.value = !syncHTMLVisable.value
  }
  // 菜单是否被激活（如果不需要，这个函数可以空着）
  // 1. 激活是什么？光标放在一段加粗、下划线的文本时，菜单栏里的 B 和 U 被激活
  // 2. 什么时候执行这个函数？每次编辑器区域的选区变化（如鼠标操作、键盘操作等），都会触发各个菜单的 tryChangeActive 函数，重新计算菜单的激活状态
  tryChangeActive() {
    // 激活菜单
    // 1. 菜单 DOM 节点会增加一个 .w-e-active 的 css class
    // 2. this.this.isActive === true
    // this.active()
    // // 取消激活菜单
    // // 1. 菜单 DOM 节点会删掉 .w-e-active
    // // 2. this.this.isActive === false
    this.unActive()
  }
}
const menuKey = 'syncHTMLMenuKey'
// 注册菜单
WangEditor.registerMenu(menuKey, syncHTMLMenu)
export default {
  name: 'Note',
  props: {
    imageConfig: Object,
    initialSetting: Object
  },
  emits: ['initContent', 'changeContent'],
  setup(props, { emit }) {
    const { baseURL } = defaultConfig
    const { $baseAlert, $baseMessage } = getCurrentInstance().appContext.config.globalProperties
    const {
      imgConfig,
      iniSetting,
      loadHtml,
      writeHtml
    } = useWangEditor(props)
    const editor = ref(null)
    let instance
    let imgsrc
    onMounted(() => {
      instance = new WangEditor(editor.value)
      // 挂载highlight插件
      instance.highlight = hljs
      instance.config.uploadImgServer = baseURL + imgConfig.uploadImgServer
      instance.config.uploadImgMaxSize = imgConfig.uploadImgMaxSize
      instance.config.uploadImgAccept = imgConfig.uploadImgAccept
      instance.config.uploadImgMaxLength = imgConfig.uploadImgMaxLength
      instance.config.uploadFileName = imgConfig.uploadFileName
      instance.config.uploadImgTimeout = imgConfig.uploadImgTimeout
      instance.config.withCredentials = imgConfig.withCredentials
      instance.config.uploadImgHeaders = imgConfig.uploadImgHeaders
      instance.config.uploadImgParamsWithUrl = imgConfig.uploadImgParamsWithUrl
      instance.config.showLinkImg = imgConfig.showLinkImg
      instance.config.uploadImgParams = iniSetting.uploadImgParams
      instance.config.zIndex = iniSetting.zIndex
      instance.config.height = iniSetting.height
      instance.config.pasteFilterStyle = iniSetting.pasteFilterStyle
      instance.config.pasteIgnoreImg = iniSetting.pasteIgnoreImg
      instance.config.menus = iniSetting.menus
      instance.config.placeholder = iniSetting.placeholder
      instance.config.focus = iniSetting.focus
      instance.config.showMenuTooltips = iniSetting.showMenuTooltips
      instance.config.uploadImgHooks = {
        // 上传图片之前
        before: function() {
          // console.log(xhr);
          // 可阻止图片上传
          return {
            prevent: false,
            msg: '需要提示给用户的错误信息'
          }
        },
        // 图片上传并返回了结果，图片插入已成功
        success: function() {
          imgsrc = getSrc(instance.txt.html())
          // console.log('success', xhr);
        },
        // 图片上传并返回了结果，但图片插入时出错了
        fail: function(xhr, editor, resData) {
          $baseAlert('图片插入出错了' + resData, '错误')
          // console.log('fail', resData);
        },
        // 上传图片出错，一般为 http 请求的错误
        error: function(xhr, editor, resData) {
          $baseAlert('图片上传错误' + resData, '错误')
          // console.log('error', xhr, resData);
        },
        // 上传图片超时
        timeout: function() {
          $baseAlert('操作超时', '错误')
          // console.log('timeout');
        }
      }
      Object.assign(instance.config, {
        onchange() {
          if (imgsrc) {
            if (imgsrc.length !== 0) {
              const nowimgs = getSrc(instance.txt.html())
              const merge = imgsrc.concat(nowimgs).filter(function(v, i, arr) {
                return arr.indexOf(v) === arr.lastIndexOf(v)
              })
              Object.keys(merge).forEach(async(key) => {
                const colds = merge[key].split('/')
                await deleteImage(imgConfig.deleteImageServer, { 'filename': colds[colds.length - 1], 'uploadImgPath': imgConfig.uploadImgPath })
              })
              imgsrc = nowimgs
            }
          }
          content.html = instance.txt.html()
          content.text = instance.txt.text()
          emit('changeContent')
        }
      })
      // 自定义alert
      instance.config.customAlert = function(s, t) {
        switch (t) {
            case 'success':
              $baseMessage(s, 'success')
              break
            case 'info':
              $baseMessage(s, { type: 'info' })
              break
            case 'warning':
              $baseAlert(s, '警告')
              break
            case 'error':
              $baseAlert(s, '错误')
              break
            default:
              $baseMessage(s, 'info')
              break
        }
      }
      instance.create()
    })
    onBeforeUnmount(() => {
      instance.destroy()
      instance = null
    })
    /**
     * 取出区域内所有img的src
     */
    const getSrc = (html) => {
      const imgReg = /<img.*?(?:>|\/>)/gi
      // 匹配src属性
      const srcReg = /src=[\\"]?([^\\"]*)[\\"]?/i
      const arr = html.match(imgReg)
      const imgs = []
      if (arr) {
        for (let i = 0; i < arr.length; i++) {
          const src = arr[i].match(srcReg)[1]
          imgs.push(src)
        }
      }
      return imgs
    }
    onMounted(() => {
      loadInitText()
    })
    const loadInitText = () => {
      loadHtml().then(response => {
        content.html = response.data
        setHtml(content.html).then(() => {
          emit('initContent')
        })
      })
    }
    const appendText = async(text) => {
      await instance.txt.append(text)
    }
    const setHtml = async(html) => {
      await instance.txt.html(html)
    }
    return {
      editor,
      content,
      syncHTMLVisable,
      appendText,
      setHtml,
      writeHtml
    }
  }
}
</script>

<style lang="scss">
.wangeditor{
  height: 100%;
  text-align: left;
  .under-edit-slot {
    border-top: 1px solid #eee;
    padding: 5px 0;
  }
  .el-overlay{
    overflow-y: hidden!important;
    .el-dialog{
      border-radius: 5px!important;
      height: 100%!important;
      margin: 0!important;
      .el-dialog__header{
        border-bottom: solid 2px #eee !important;
      }
      .el-dialog__body{
        padding: 20px 20px !important;
        height: calc(100vh - 100px)!important;
      }
    }
  }
}
</style>
