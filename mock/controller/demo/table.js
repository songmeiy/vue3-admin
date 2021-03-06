const { mock } = require('mockjs')
const { handleRandomImage } = require('../../utils')
const List = []
const count = 50
for (let i = 0; i < count; i++) {
  List.push(
    mock({
      uuid: '@uuid',
      id: '@id',
      title: '@title(1, 2)',
      description: '@csentence',
      'status|1': ['published', 'draft', 'deleted'],
      author: '@cname',
      datetime: '@datetime',
      pageViews: '@integer(300, 5000)',
      img: handleRandomImage(228, 228),
      switch: '@boolean',
      percent: '@integer(80,99)',
      'rate|1': [1, 2, 3, 4, 5],
      percentage: '@integer(0,100)'
    })
  )
}

module.exports = [
  {
    url: '/demo/table/getList',
    type: 'get',
    response(config) {
      const { title, pageNo = 1, pageSize = 20 } = config.query
      const mockList = List.filter(
        (item) => !(title && item.title.indexOf(title) < 0)
      )
      const pageList = mockList.filter(
        (item, index) =>
          index < pageSize * pageNo && index >= pageSize * (pageNo - 1)
      )
      return {
        code: 200,
        totalCount: mockList.length,
        data: pageList
      }
    }
  },
  {
    url: '/demo/table/doEdit',
    type: 'post',
    response() {
      return {
        code: 200,
        message: '模拟保存成功'
      }
    }
  },
  {
    url: '/demo/table/doDelete',
    type: 'post',
    response() {
      return {
        code: 200,
        message: '模拟删除成功'
      }
    }
  }
]
