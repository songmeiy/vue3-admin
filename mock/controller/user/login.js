const accessTokens = {
  admin: 'admin-accessToken',
  editor: 'editor-accessToken',
  test: 'test-accessToken'
}
module.exports = [
  {
    url: '/user/login',
    type: 'post',
    response(config) {
      const { username } = config.body
      const token = accessTokens[username]
      if (!token) {
        return {
          code: 500,
          message: '帐户或密码不正确。'
        }
      }
      return {
        code: 200,
        message: 'success',
        data: { token }
      }
    }
  },
  {
    url: '/socialLogin',
    type: 'post',
    response(config) {
      const { code } = config.body
      if (!code) {
        return {
          code: 500,
          message: 'message.login.未成功获取Token'
        }
      }
      return {
        code: 200,
        message: 'message.login.模拟登录成功',
        data: { accessToken: accessTokens['admin'] }
      }
    }
  },
  {
    url: '/user/logout',
    type: 'get',
    response() {
      return {
        code: 200,
        message: 'success'
      }
    }
  }
]
