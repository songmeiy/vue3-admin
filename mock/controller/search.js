const data = [
  {
    url: 'https://github.com/zepingwong/vue3-admin',
    value: 'github地址'
  },
  {
    url: 'https://gitee.com/zepingwong/vue3-admin',
    value: 'gitee地址'
  },
  {
    url: '',
    value: '使用文档，你猜我写完了嘛'
  }
]
module.exports = [
  {
    url: '/system/search/getList',
    type: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data
      }
    }
  }
]
