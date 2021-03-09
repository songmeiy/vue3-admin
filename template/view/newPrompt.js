const fs = require('fs')
const { join } = require('path')
const folders = []
const path = './src/views'
const files = fs.readdirSync(path)
files.forEach((item) => {
  const fPath = join(path, item)
  const stat = fs.statSync(fPath)
  if (stat.isDirectory() === true) folders.push(item)
})
module.exports = {
  description: '创建新的文件夹并创建view',
  prompts: [
    {
      type: 'input',
      name: 'folderName',
      message: '文件夹名称',
      validate: function(value) {
        if (!value) return '文件夹名称不能为空'
        if (folders.indexOf(value) !== -1) return '文件夹已存在'
        return true
      }
    },
    {
      type: 'input',
      name: 'filename',
      message: '文件名称',
      validate: function(value) {
        if (!value) return '文件名称不能为空'
        return true
      }
    }
  ],
  actions: () => {
    const folderName = '{{folderName}}'
    const filename = '{{filename}}'
    return [
      {
        type: 'add',
        path: `src/views/${folderName}/${filename}.vue`,
        templateFile: './template/view/index.hbs',
        data: {
          name: filename
        }
      }
    ]
  }
}
