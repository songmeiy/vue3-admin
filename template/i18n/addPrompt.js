const { notEmpty } = require('../../src/utils/notEmpty')
const fs = require('fs')
const { join } = require('path')
const folders = []
const path = './src/utils/i18n/lang'
const files = fs.readdirSync(path)
files.forEach((item) => {
  const fPath = join(path, item)
  const stat = fs.statSync(fPath)
  if (stat.isDirectory() === true) folders.push(item)
})
module.exports = {
  description: '添加模块',
  prompts: [
    {
      type: 'input',
      name: 'filename',
      message: '请输入名称,勿与之前重复,然后点击回车',
      validate: notEmpty('name')
    }
  ],
  actions: () => {
    const filename = '{{filename}}'
    const actions = []
    folders.forEach((value) => {
      actions.push({
        type: 'add',
        path: `src/utils/i18n/lang/${value}/modules/${filename}.js`,
        templateFile: './template/i18n/modules.hbs',
        data: {
          name: filename
        }
      })
    })
    return actions
  }
}
