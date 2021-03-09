const { mock } = require('mockjs')
const Tree = []
for (let i = 0; i < 10; i++) {
  Tree.push(
    mock({
      uuid: '@uuid',
      id: '@id',
      title: '@title(1, 2)',
      description: '@csentence',
      author: '@cname',
      datetime: '@datetime',
      children: []
    })
  )
  const num = Math.floor(Math.random() * 10)
  for (let j = 0; j < num; j++) {
    Tree[i].children.push(
      mock({
        uuid: '@uuid',
        id: '@id',
        title: '@title(1, 2)',
        description: '@csentence',
        'status|1': ['published', 'draft', 'deleted'],
        author: '@cname',
        datetime: '@datetime',
        children: []
      })
    )
  }
}
module.exports = [
  {
    url: '/demo/tree/getList',
    type: 'get',
    response() {
      return {
        code: 200,
        data: Tree
      }
    }
  },
  {
    url: '/demo/tree/doDelete',
    type: 'post',
    response() {
      return {
        code: 200,
        message: '模拟删除成功'
      }
    }
  }
]
