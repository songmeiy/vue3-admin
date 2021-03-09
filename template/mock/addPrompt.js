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
  description: '选择文件夹，并添加mock&api',
  prompts: [
    {
      type: 'list',
      name: 'folderName',
      choices: folders,
      message: '选择文件夹，然后回车',
      validate: notEmpty('name')
    },
    {
      type: 'input',
      name: 'filename',
      message: '请输入mock名称,勿与之前重复,然后点击回车',
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
