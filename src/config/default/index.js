/**
 * @description 导出默认配置(vue/cli配置|通用配置|主题配置|网络配置)
 **/
const setting = require('./setting.config')
const theme = require('./theme.config')
const network = require('./net.config')
const cli = require('./cli.config')
module.exports = { setting, theme, network, cli }
