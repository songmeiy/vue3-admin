import Layout from '@/layout/layouts'
const settings = {
  path: '/setting',
  name: 'Setting',
  component: Layout,
  redirect: '/setting/theme',
  meta: {
    title: '设置',
    icon: 'setting',
    dynamicNewTab: false,
    noKeepAlive: false
  },
  children: [
    {
      path: 'theme',
      name: 'themeSetting',
      component: () => import('@/views/settings/themeSetting'),
      meta: {
        title: '主题设置',
        icon: 'theme',
        noKeepAlive: false
      }
    },
    {
      path: 'system',
      name: 'systemSetting',
      component: () => import('@/views/settings/systemSetting'),
      meta: {
        title: '系统设置',
        icon: 'system',
        roles: ['admin'],
        noKeepAlive: false
      }
    },
    {
      path: 'personalCenter',
      name: 'personalCenter',
      component: () => import('@/views/settings/personalCenter'),
      meta: {
        title: '个人中心',
        icon: 'personal',
        noKeepAlive: false
      }
    },
    {
      path: 'roles',
      name: 'Roles',
      component: () => import('@/views/settings/roles'),
      meta: {
        title: '角色权限',
        icon: 'user',
        roles: ['admin'],
        noKeepAlive: false
      }
    }
  ]
}
export default settings
