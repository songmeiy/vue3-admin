/* 用于模板生成指令勿动，否则后果自负 */
const AddViewGenerator = require('./template/view/addPrompt')
const NewViewGenerator = require('./template/view/newPrompt')
const NewMockGenerator = require('./template/mock/newPrompt')
const AddMockGenerator = require('./template/mock/addPrompt')
const AddI18nGenerator = require('./template/i18n/addPrompt')
const VuexGenerator = require('./template/vuex/prompt')
module.exports = (plop) => {
  plop.setGenerator('add a view', AddViewGenerator)
  plop.setGenerator('new a view', NewViewGenerator)
  plop.setGenerator('add a mock&api', AddMockGenerator)
  plop.setGenerator('new a mock&api', NewMockGenerator)
  plop.setGenerator('add an i18n', AddI18nGenerator)
  plop.setGenerator('vuex', VuexGenerator)
}
