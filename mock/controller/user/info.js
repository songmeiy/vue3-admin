const userInfo = {
  'admin-accessToken': {
    name: 'admin',
    roles: ['admin'],
    ability: ['READ', 'WRITE', 'DELETE'],
    username: 'admin',
    personality: '小仙男,admin,业余码农',
    email: 'zepingwong@gmail.com',
    description: '人间枝头，各自乘流',
    gender: 0,
    // eslint-disable-next-line camelcase
    last_time: '2020-12-31 23:59:59',
    // eslint-disable-next-line camelcase
    last_ip: '127.0.0.1'
  },
  'editor-accessToken': {
    name: 'editor',
    roles: ['editor'],
    ability: ['READ', 'WRITE'],
    username: 'editor',
    personality: '小仙男,editor,业余码农',
    email: 'zepingwong@gmail.com',
    description: '浮舟沧海，立马昆仑',
    gender: 0,
    // eslint-disable-next-line camelcase
    last_time: '2020-12-31 23:59:59',
    // eslint-disable-next-line camelcase
    last_ip: '127.0.0.1'
  },
  'test-accessToken': {
    name: 'test',
    roles: ['admin', 'editor'],
    ability: ['READ'],
    username: 'test',
    personality: '小仙男,test,业余码农',
    email: 'zepingwong@gmail.com',
    description: '虽则如云，匪我思存',
    gender: 0,
    // eslint-disable-next-line camelcase
    last_time: '2020-12-31 23:59:59',
    // eslint-disable-next-line camelcase
    last_ip: '127.0.0.1'
  }
}
module.exports = [
  {
    url: '/user/info/doEdit',
    type: 'post',
    response() {
      return {
        code: 200,
        message: '模拟修改成功',
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
    url: '/user/info/getMyInfo',
    type: 'get',
    response(config) {
      let info = {}
      let message = ''
      let code = 200
      const { accessToken } = config.query
      if (accessToken !== 'admin-accessToken' && accessToken !== 'editor-accessToken' && accessToken !== 'test-accessToken') {
        code = 401
        message = 'token失效'
      } else {
        info = userInfo[accessToken]
      }
      return {
        code: code,
        message: message,
        data: {
          ...info,
          'avatar|1': [
            'https://zepingwong.github.io/static/image/avatar-1.png',
            'https://zepingwong.github.io/static/image/avatar-2.png',
            'https://zepingwong.github.io/static/image/avatar-3.png',
            'https://zepingwong.github.io/static/image/avatar-4.png',
            'https://zepingwong.github.io/static/image/avatar-5.png',
            'https://zepingwong.github.io/static/image/avatar-6.png',
            'https://zepingwong.github.io/static/image/avatar-7.png'
          ]
        }
      }
    }
  }
]
