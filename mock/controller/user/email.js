module.exports = [
  {
    url: '/user/email/bindingEmailSend',
    type: 'post',
    response() {
      return {
        code: 200,
        message: '模拟发送邮件成功',
        data: {}
      }
    }
  }
]
