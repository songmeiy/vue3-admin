/**
 * 语言模块比较多，抽离到各个模块分别写
 */
const files = require.context('./modules', false, /\.js$/)
const modules = {}
files.keys().forEach((key) => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})
export default modules
