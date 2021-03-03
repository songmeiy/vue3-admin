module.exports = [
  {
    url: '/user/register',
    type: 'post',
    response() {
      return {
        code: 200,
        message: 'message.register.模拟注册成功'
      }
    }
  }
]
