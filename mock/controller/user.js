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
    url: '/user/editInfo',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟修改成功',
        data: {}
      }
    }
  },
  {
    url: '/user/uploadAvatar',
    type: 'post',
    response() {
      return {
        code: 200,
        message: '模拟上传成功',
        data: {}
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
          msg: '未成功获取Token。'
        }
      }
      return {
        code: 200,
        msg: 'success',
        data: { accessToken: accessTokens['admin'] }
      }
    }
  },
  {
    url: '/register',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟注册成功'
      }
    }
  },
  {
    url: '/user/getMyInfo',
    type: 'get',
    response(config) {
      const { accessToken } = config.query
      let roles = ['admin']
      let ability = ['READ']
      let username = 'admin'
      let personality = ''
      let name = ''
      let email = 'zepingwong@gmail.com'
      let description = ''
      let gender = 0
      // eslint-disable-next-line camelcase
      let last_time = ''
      // eslint-disable-next-line camelcase
      let last_ip = ''
      if (accessToken === 'admin-accessToken') {
        name = 'admin'
        roles = ['admin']
        ability = ['READ', 'WRITE', 'DELETE']
        username = 'admin'
        personality = '小仙男,admin,业余码农'
        email = 'zepingwong@gmail.com'
        description = '人间枝头，各自乘流'
        gender = 0
        // eslint-disable-next-line camelcase
        last_time = '2020-12-31 23:59:59'
        // eslint-disable-next-line camelcase
        last_ip = '127.0.0.1'
      }
      if (accessToken === 'editor-accessToken') {
        name = 'editor'
        roles = ['editor']
        ability = ['READ', 'WRITE']
        username = 'editor'
        personality = '小仙男,editor,业余码农'
        email = 'zepingwong@gmail.com'
        description = '浮舟沧海，立马昆仑'
        gender = 0
        // eslint-disable-next-line camelcase
        last_time = '2020-12-31 23:59:59'
        // eslint-disable-next-line camelcase
        last_ip = '127.0.0.1'
      }
      if (accessToken === 'test-accessToken') {
        name = 'test'
        roles = ['admin', 'editor']
        ability = ['READ']
        username = 'test'
        personality = '小仙男,test,业余码农'
        email = 'zepingwong@gmail.com'
        description = '虽则如云，匪我思存'
        gender = 0
        // eslint-disable-next-line camelcase
        last_time = '2020-12-31 23:59:59'
        // eslint-disable-next-line camelcase
        last_ip = '127.0.0.1'
      }
      return {
        code: 200,
        message: 'success',
        data: {
          email,
          name,
          roles,
          gender,
          ability,
          username,
          // eslint-disable-next-line camelcase
          last_time,
          // eslint-disable-next-line camelcase
          last_ip,
          personality,
          description,
          'avatar|1': [
            'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif',
            'https://i.gtimg.cn/club/item/face/img/8/15918_100.gif'
          ]
        }
      }
    }
  },
  {
    url: '/logout',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: 'success'
      }
    }
  }
]
