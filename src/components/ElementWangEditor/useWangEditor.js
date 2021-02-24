import { reactive } from 'vue'
import { baseAlert } from '@/components/ElementPlus'

export function useWangEditor(props) {
  const imgConfig = reactive({})
  const iniSetting = reactive({})
  // eslint-disable-next-line no-prototype-builtins
  if (props.imageConfig.hasOwnProperty('uploadImgServer')) {
    imgConfig.uploadImgServer = props.imageConfig.uploadImgServer !== '' ? props.imageConfig.uploadImgServer : '/demo/WangEditor/uploadImage'
  } else {
    imgConfig.uploadImgServer = '/demo/WangEditor/uploadImage'
  }
  // eslint-disable-next-line no-prototype-builtins
  if (props.imageConfig.hasOwnProperty('deleteImageServer')) {
    imgConfig.deleteImageServer = props.imageConfig.deleteImageServer !== '' ? props.imageConfig.deleteImageServer : '/demo/WangEditor/deleteImage'
  } else {
    imgConfig.deleteImageServer = '/demo/WangEditor/deleteImage'
  }
  // eslint-disable-next-line no-prototype-builtins
  if (props.imageConfig.hasOwnProperty('uploadImgMaxSize')) {
    imgConfig.uploadImgMaxSize = props.imageConfig.uploadImgMaxSize !== '' ? props.imageConfig.uploadImgMaxSize : 2 * 1024 * 1024
  } else {
    imgConfig.uploadImgMaxSize = 2 * 1024 * 1024
  }
  // 图片类型限制
  // eslint-disable-next-line no-prototype-builtins
  if (props.imageConfig.hasOwnProperty('uploadImgAccept')) {
    imgConfig.uploadImgAccept = props.imageConfig.uploadImgAccept.length > 0 ? props.imageConfig.uploadImgAccept : ['jpg', 'jpeg', 'png', 'gif', 'bmp']
  } else {
    imgConfig.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp']
  }
  // 上传图片携带参数
  // eslint-disable-next-line no-prototype-builtins
  if (props.imageConfig.hasOwnProperty('uploadImgParams')) {
    imgConfig.uploadImgParams = props.imageConfig.uploadImgParams ? props.imageConfig.uploadImgParams : {}
  } else {
    imgConfig.uploadImgParams = {}
  }
  // 一次最多上传 5 个图片
  // eslint-disable-next-line no-prototype-builtins
  if (props.imageConfig.hasOwnProperty('uploadImgMaxLength')) {
    imgConfig.uploadImgMaxLength = props.imageConfig.uploadImgMaxLength !== '' ? props.imageConfig.uploadImgMaxLength : 5
  } else {
    imgConfig.uploadImgMaxLength = 5
  }
  // 上传接口最大等待时间 10s
  // eslint-disable-next-line no-prototype-builtins
  if (props.imageConfig.hasOwnProperty('uploadImgTimeout')) {
    imgConfig.uploadImgTimeout = props.imageConfig.uploadImgTimeout !== '' ? props.imageConfig.uploadImgTimeout : 10 * 1000
  } else {
    imgConfig.uploadImgTimeout = 10 * 1000
  }
  // 是否显示插入网络图片功能
  // eslint-disable-next-line no-prototype-builtins
  if (props.imageConfig.hasOwnProperty('showLinkImg')) {
    imgConfig.showLinkImg = props.imageConfig.showLinkImg !== '' ? props.imageConfig.showLinkImg : true
  } else {
    imgConfig.showLinkImg = true
  }
  // 网络图片配置Alt选项
  // eslint-disable-next-line no-prototype-builtins
  if (props.imageConfig.hasOwnProperty('showLinkImgAlt')) {
    imgConfig.showLinkImgAlt = props.imageConfig.showLinkImgAlt !== '' ? props.imageConfig.showLinkImgAlt : true
  } else {
    imgConfig.showLinkImgAlt = true
  }
  // 网络图片配置超链接
  // eslint-disable-next-line no-prototype-builtins
  if (props.imageConfig.hasOwnProperty('showLinkImgHref')) {
    imgConfig.showLinkImgHref = props.imageConfig.showLinkImgHref !== '' ? props.imageConfig.showLinkImgHref : true
  } else {
    imgConfig.showLinkImgHref = true
  }
  // 设置文件上传的参数名称
  imgConfig.uploadFileName = 'file'
  // 请求头
  imgConfig.uploadImgHeaders = props.imageConfig.uploadImgHeaders
  // 携带cookies
  imgConfig.withCredentials = true
  // 设置请求头
  // eslint-disable-next-line no-prototype-builtins
  if (props.imageConfig.hasOwnProperty('uploadImgHeaders')) {
    imgConfig.uploadImgHeaders = props.imageConfig.uploadImgHeaders
  } else {
    imgConfig.uploadImgHeaders = {}
  }
  // 将携带参数拼接到URL中
  imgConfig.uploadImgParamsWithUrl = false
  // 是否开启粘贴样式过滤
  // eslint-disable-next-line no-prototype-builtins
  if (props.initialSetting.hasOwnProperty('pasteFilterStyle')) {
    iniSetting.pasteFilterStyle = props.initialSetting.pasteFilterStyle !== '' ? props.initialSetting.pasteFilterStyle : true
  } else {
    iniSetting.pasteFilterStyle = true
  }
  // 是否忽略粘贴内容中的图片
  // eslint-disable-next-line no-prototype-builtins
  if (props.initialSetting.hasOwnProperty('pasteIgnoreImg')) {
    iniSetting.pasteIgnoreImg = props.initialSetting.pasteIgnoreImg !== '' ? props.initialSetting.pasteIgnoreImg : true
  } else {
    iniSetting.pasteIgnoreImg = true
  }
  // 菜单内容及顺序
  // eslint-disable-next-line no-prototype-builtins
  if (props.initialSetting.hasOwnProperty('menus')) {
    iniSetting.menus = props.initialSetting.menus !== '' ? props.initialSetting.menus : ['head', 'bold', 'fontSize', 'fontName', 'italic', 'underline', 'strikeThrough', 'indent', 'lineHeight', 'foreColor', 'backColor', 'link', 'list', 'todo', 'justify', 'quote', 'emoticon', 'image', 'video', 'table', 'code', 'splitLine', 'undo', 'redo']
  } else {
    iniSetting.menus = ['head', 'bold', 'fontSize', 'fontName', 'italic', 'underline', 'strikeThrough', 'indent', 'lineHeight', 'foreColor', 'backColor', 'link', 'list', 'todo', 'justify', 'quote', 'emoticon', 'image', 'video', 'table', 'code', 'splitLine', 'undo', 'redo']
  }
  // 初始化文字内容
  // eslint-disable-next-line no-prototype-builtins
  if (props.initialSetting.hasOwnProperty('initText')) {
    iniSetting.initText = props.initialSetting.initText !== '' ? props.initialSetting.initText : '欢迎使用富文本编辑器'
  } else {
    iniSetting.initText = '欢迎使用富文本编辑器'
  }
  // 设置编辑器高度
  // eslint-disable-next-line no-prototype-builtins
  if (props.initialSetting.hasOwnProperty('height')) {
    iniSetting.height = props.initialSetting.height !== '' ? props.initialSetting.height : 300
  } else {
    iniSetting.height = 300
  }
  // 设置编辑器z-index
  // eslint-disable-next-line no-prototype-builtins
  if (props.initialSetting.hasOwnProperty('zIndex')) {
    iniSetting.zIndex = props.initialSetting.zIndex !== '' ? props.initialSetting.zIndex : 10000
  } else {
    iniSetting.zIndex = 10000
  }
  // 设置编辑器placeholder
  // eslint-disable-next-line no-prototype-builtins
  if (props.initialSetting.hasOwnProperty('placeholder')) {
    iniSetting.placeholder = props.initialSetting.placeholder
  } else {
    iniSetting.placeholder = ''
  }

  // 自动focus
  // eslint-disable-next-line no-prototype-builtins
  if (props.initialSetting.hasOwnProperty('focus')) {
    iniSetting.focus = props.initialSetting.focus !== '' ? props.initialSetting.focus : true
  } else {
    iniSetting.focus = true
  }
  // 是否显示菜单提示
  // eslint-disable-next-line no-prototype-builtins
  if (props.initialSetting.hasOwnProperty('showMenuTooltips')) {
    iniSetting.showMenuTooltips = props.initialSetting.showMenuTooltips !== '' ? props.initialSetting.showMenuTooltips : true
  } else {
    iniSetting.showMenuTooltips = true
  }
  // 这里使用async/await 进行异步的数据处理问题
  const loadHtml = async() => {
    try {
      return { data: props.initialSetting.initText }
    } catch (err) {
      await baseAlert(err, '错误')
    }
  }
  return {
    imgConfig,
    iniSetting,
    loadHtml
  }
}
