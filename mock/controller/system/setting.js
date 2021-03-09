module.exports = [
  {
    url: '/system/settings/getList',
    type: 'get',
    response() {
      return {
        code: 200,
        data: {
          websiteTitle: 'vue3-admin',
          allowRegister: true,
          supportVisit: false,
          titleReverse: false,
          titleSeparator: ' - ',
          copyright: 'WangZeping zepingwong@gmail.com',
          websiteLogo: 'vuejs-fill',
          loginInterception: true,
          routesWhiteList: ('/login,/callback,/404,/403,/register').split(','),
          recordRoute: true,
          loadingText: '加载中。。。',
          messageDuration: 2000,
          rolesControl: true
        }
      }
    }
  },
  {
    url: '/system/settings/doEdit',
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
