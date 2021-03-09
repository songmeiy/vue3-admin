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
let folderName = ''
module.exports = {
  description: '选择已有文件夹并创建view',
  prompts: [
    {
      type: 'list',
      name: 'folderName',
      choices: folders,
      message: '选择文件夹，然后回车',
      validate: (value) => {
        folderName = value
        if (!value) return '请选择文件夹'
        return true
      }
    },
    {
      type: 'input',
      name: 'filename',
      message: '文件名称',
      validate: function(value) {
        const filenames = []
        const files = fs.readdirSync('./src/views' + folderName)
        files.forEach((item) => {
          const fPath = join(path, item)
          const stat = fs.statSync(fPath)
          if (stat.isFile() === true) filenames.push(item)
        })
        if (filenames.indexOf(value + '.vue') !== -1) return '文件已存在'
        if (!value) return '文件名称不能为空'
        return true
      }
    }
  ],
  actions: () => {
    const filename = '{{filename}}'
    const folderName = '{{folderName}}'
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
