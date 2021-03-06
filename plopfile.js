/* 用于模板生成指令勿动，否则后果自负 */
const viewGenerator = require('./template/view/prompt')
module.exports = (plop) => {
  plop.setGenerator('view', viewGenerator)
}
