import '@/style/variables/element-variables.scss'
import 'element-plus/lib/theme-chalk/display.css'
import 'element-plus/lib/theme-chalk/index.css'
require('./global.scss')
// 加载主题
const requireTheme = require.context('./themes', false, /\.scss$/)
requireTheme.keys().forEach((fileName) => {
  requireTheme(fileName)
})
