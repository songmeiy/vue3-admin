/**
 * @description 导出通用配置
 */
module.exports = {
  // 标题，此项修改后需要重启项目 (包括初次加载雪花屏的标题 页面的标题 浏览器的标题)
  websiteTitle: 'vue3-admin',
  // 标题分隔符
  titleSeparator: ' - ',
  // 标题是否反转
  // 如果为false: "page - title"
  // 如果为ture : "title - page"
  titleReverse: false,
  // 简写
  abbreviation: 'vue3-admin',
  // copyright
  copyright: 'WangZeping zepingwong@gmail.com',
  // 缓存路由的最大数量
  keepAliveMaxNum: 20,
  // 不经过token校验的路由，白名单路由建议配置到与login页面同级，如果需要放行带传参的页面，请使用query传参，配置时只配置path即可
  routesWhiteList: ['/login', '/register', '/callback', '/404', '/403'],
  // 加载时显示文字
  loadingText: '',
  // token名称
  tokenName: 'token',
  // token在localStorage、sessionStorage、cookie存储的key的名称
  tokenTableName: 'vue3-admin-token',
  // token存储位置localStorage sessionStorage cookie
  storage: 'localStorage',
  // token失效回退到登录页时是否记录本次的路由
  recordRoute: false,
  // 是否开启logo，不显示时设置false，请填写src/assets/icons路径下的图标名称
  websiteLogo: 'false',
  // 语言类型zh-cn、en
  language: 'zh-cn',
  // 消息框消失时间
  messageDuration: 3000,
  // 在哪些环境下显示高亮错误
  errorLog: ['development'/* , 'production' */],
  // 是否开启登录拦截
  loginInterception: false,
  // 是否开启登录RSA加密
  loginRSA: true,
  // intelligence(前端导出路由)和all(后端导出路由)两种方式
  authentication: 'intelligence',
  // 是否支持游客模式，支持情况下，访问白名单，可查看所有asyncRoutes
  supportVisit: false,
  // 是否开启roles字段进行角色权限控制(如果是all模式后端完全处理角色并进行json组装，可设置false不处理路由中的roles字段)
  rolesControl: true,
  // 开放注册
  allowRegister: false,
  // vertical column comprehensive common布局时默认展开的菜单path，使用逗号隔开建议只展开一个
  defaultOpeneds: ['/index'],
  // 需要加loading层的请求，防止重复提交
  debounce: ['doEdit'],
  // 代码生成机生成在view下的文件夹名称
  templateFolder: 'project',
  // 开发工具控制台名字显示
  webpackBarName: 'vue3-admin',
  // 浏览器注释显示
  webpackBanner: ' build: vue3-admin \n copyright: WangZeping zepingwong@gmail.com \n time: '
}
