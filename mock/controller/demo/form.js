module.exports = [
  {
    url: '/demo/form/doAdd',
    type: 'post',
    response() {
      return {
        code: 200,
        message: '模拟创建成功'
      }
    }
  }
]
