export const imageConfig = {
  uploadImgMaxSize: 2 * 1024 * 1024, // 图片大小限制，默认为2M
  uploadImgAccept: ['jpg', 'jpeg', 'png', 'gif', 'bmp'], // 图片类型限制，默认 ['jpg', 'jpeg', 'png', 'gif', 'bmp']
  uploadImgMaxLength: 5, // 一次最多上传图片张数，默认为5张
  uploadImgTimeout: 10 * 1000, // 上传接口最大等待时间，默认为10s
  withCredentials: true, // 是否携带cookies，默认为true
  uploadImgHeaders: {}, // 设置请求头，要求为对象
  uploadImgParams: {}, // 携带的参数,要求为对象
  uploadImgServer: '', // 图片上传地址
  deleteImageServer: '', // 删除图片地址
  showLinkImg: true, // 显示插入网络图片功能，默认为true
  showLinkImgAlt: true, // 网络图片配置Alt选项
  showLinkImgHref: true // 网络图片配置超链接
}
export const initialSetting = {
  zIndex: 500, // 编辑器 z-index 默认为 10000，可以自行调整。
  height: 500, // 设置编辑区域高度为 500px，默认300px
  initText: '<p>欢迎使用富文本编辑器</p>', // html 初始化内容
  pasteFilterStyle: true, // 样式过滤
  pasteIgnoreImg: true, // 忽略粘贴内容中的图片
  placeholder: '', // 可以修改 placeholder 的提示文字
  focus: true, // 自动 focus
  showMenuTooltips: true, // 是否开启菜单提示，默认开启
  menus: ['head', 'bold', 'fontSize', 'fontName', 'italic', 'underline', 'strikeThrough', 'indent', 'lineHeight', 'foreColor', 'backColor', 'link', 'list', 'todo', 'justify', 'quote', 'emoticon', 'image', 'video', 'table', 'code', 'splitLine', 'undo', 'redo'] // 菜单选项，默认显示全部菜单
}
// 以上配置文件可以根据业务需要分布配置在不同的文件里
