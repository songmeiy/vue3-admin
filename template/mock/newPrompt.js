const { notEmpty } = require('../../src/utils/notEmpty')
const fs = require('fs')
const { join } = require('path')
const folders = []
const path = './mock/controller'
const files = fs.readdirSync(path)
files.forEach((item) => {
  const fPath = join(path, item)
  const stat = fs.statSync(fPath)
  if (stat.isDirectory() === true) folders.push(item)
})
module.exports = {
  description: '新建文件夹，并添加mock&api',
  prompts: [
    {
      type: 'input',
      name: 'folderName',
      choices: folders,
      message: '输入文件夹名称，勿与之前重复,然后点击回车',
      validate: (value) => {
        if (!value) return '文件夹名称不能为空'
        if (folders.indexOf(value) !== -1) return '文件夹已存在'
        return true
      }
    },
    {
      type: 'input',
      name: 'filename',
      message: '请输入mock名称,然后点击回车',
      validate: notEmpty('name')
    }
  ],
  actions: () => {
    const filename = '{{filename}}'
    const folderName = '{{folderName}}'
    return [
      {
        type: 'add',
        path: `mock/controller/${folderName}/${filename}.js`,
        templateFile: './template/mock/index.hbs',
        data: {
          name: filename
        }
      },
      {
        type: 'add',
        path: `src/api/${folderName}/${filename}.js`,
        templateFile: './template/api/index.hbs',
        data: {
          name: filename
        }
      }
    ]
  }
}
