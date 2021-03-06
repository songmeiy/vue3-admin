const { notEmpty } = require('../../src/utils/notEmpty')

module.exports = {
  description: '创建mock&api',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: '请输入mock名称,勿与之前重复,然后点击回车',
      validate: notEmpty('name')
    }
  ],
  actions: () => {
    const name = '{{name}}'
    return [
      {
        type: 'add',
        path: `mock/controller/${name}/index.js`,
        templateFile: './template/mock/index.hbs',
        data: {
          name: name
        }
      },
      {
        type: 'add',
        path: `src/api/${name}.js`,
        templateFile: './template/api/index.hbs',
        data: {
          name: name
        }
      }
    ]
  }
}
