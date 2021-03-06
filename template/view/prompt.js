const { notEmpty } = require('../../src/utils/notEmpty')
const { templateFolder } = require('../../src/config')
module.exports = {
  description: '创建view',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: '请输入view名称,勿与之前重复,然后点击回车',
      validate: notEmpty('name')
    }
  ],
  actions: () => {
    const name = '{{name}}'
    return [
      {
        type: 'add',
        path: `src/views/${templateFolder || 'project'}/${name}/index.vue`,
        templateFile: './template/view/index.hbs',
        data: {
          name: name
        }
      }
    ]
  }
}
