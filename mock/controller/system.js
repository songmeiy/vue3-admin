module.exports = [
  {
    url: '/system/getSystemSettings',
    type: 'get',
    response() {
      return {
        code: 200,
        message: 'success',
        data: {
          websiteTitle: 'vue3-admin',
          allowRegister: false,
          supportVisit: false,
          titleReverse: false,
          titleSeparator: ' - ',
          copyright: 'WangZeping zepingwong@gmail.com',
          websiteLogo: 'vuejs-fill',
          loginInterception: true,
          routesWhiteList: ('/login,/callback,/404,/403,/register').split(','),
          recordRoute: true,
          loadingText: '加载中。。。',
          messageDuration: 2000
        }
      }
    }
  },
  {
    url: '/system/changeSystemSettings',
    type: 'post',
    response() {
      const data = {}
      return {
        code: 200,
        message: '模拟修改成功',
        data: data
      }
    }
  }
]
