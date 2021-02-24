const data = [
  {
    email: '@email',
    'image|1': [
      'https://zepingwong.github.io/image/avatar-1.png',
      'https://zepingwong.github.io/image/avatar-2.png',
      'https://zepingwong.github.io/image/avatar-3.png',
      'https://zepingwong.github.io/image/avatar-4.png',
      'https://zepingwong.github.io/image/avatar-5.png',
      'https://zepingwong.github.io/image/avatar-6.png',
      'https://zepingwong.github.io/image/avatar-7.png'
    ],
    notice: 'github开源地址：<a target="_blank" href="https://github.com/zepingwong/vue3-admin">点我</a>'
  },
  {
    email: '@email',
    'image|1': [
      'https://zepingwong.github.io/image/avatar-1.png',
      'https://zepingwong.github.io/image/avatar-2.png',
      'https://zepingwong.github.io/image/avatar-3.png',
      'https://zepingwong.github.io/image/avatar-4.png',
      'https://zepingwong.github.io/image/avatar-5.png',
      'https://zepingwong.github.io/image/avatar-6.png',
      'https://zepingwong.github.io/image/avatar-7.png'
    ],
    notice: "gitee开源地址：<a target='_blank' href='https://gitee.com/zepingwong/vue3-admin'>点我</a>"
  }
]
module.exports = [
  {
    url: '/notice/getList',
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
