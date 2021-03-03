import Layout from '@/layout/layouts'
const settings = {
  path: '/setting',
  name: 'Setting',
  component: Layout,
  redirect: '/setting/theme',
  hidden: false,
  alwaysShow: false,
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
      hidden: false,
      alwaysShow: false,
      redirect: '',
      component: () => import('@/views/settings/themeSetting'),
      meta: {
        title: '主题设置',
        isCustomSvg: true,
        icon: 'theme',
        roles: [],
        badge: '',
        dot: false,
        tabHidden: false,
        dynamicNewTab: false,
        noKeepAlive: false,
        activeMenu: false
      }
    },
    {
      path: 'system',
      name: 'SystemSetting',
      hidden: false,
      alwaysShow: false,
      redirect: '',
      component: () => import('@/views/settings/systemSetting'),
      meta: {
        title: '系统设置',
        isCustomSvg: true,
        icon: 'system',
        roles: ['admin'],
        badge: '',
        dot: false,
        tabHidden: false,
        dynamicNewTab: false,
        noKeepAlive: false,
        activeMenu: false
      }
    },
    {
      path: 'personal',
      name: 'PersonalCenter',
      hidden: false,
      alwaysShow: false,
      redirect: '',
      component: () => import('@/views/settings/personalCenter'),
      meta: {
        title: '个人中心',
        isCustomSvg: true,
        icon: 'personal',
        roles: [],
        badge: '',
        dot: false,
        tabHidden: false,
        dynamicNewTab: false,
        noKeepAlive: false,
        activeMenu: false
      }
    },
    {
      path: 'role',
      name: 'RoleManagement',
      hidden: false,
      alwaysShow: false,
      redirect: '',
      component: () => import('@/views/settings/roleManagement'),
      meta: {
        title: '角色权限',
        isCustomSvg: true,
        icon: 'user',
        roles: ['admin'],
        badge: '',
        dot: false,
        tabHidden: false,
        dynamicNewTab: false,
        noKeepAlive: false,
        activeMenu: false
      }
    },
    {
      path: 'roles',
      name: 'RolesManagement',
      hidden: false,
      alwaysShow: false,
      redirect: '',
      component: () => import('@/views/settings/roleManagement/roles'),
      meta: {
        title: '角色管理',
        isCustomSvg: true,
        icon: 'user',
        roles: ['admin'],
        badge: '',
        dot: false,
        tabHidden: false,
        dynamicNewTab: false,
        noKeepAlive: false,
        activeMenu: false
      }
    },
    {
      path: 'menu',
      name: 'MenuManagement',
      hidden: false,
      alwaysShow: false,
      redirect: '',
      component: () => import('@/views/settings/menuManagement'),
      meta: {
        title: '菜单管理',
        isCustomSvg: true,
        icon: 'menu',
        roles: ['admin'],
        badge: '',
        dot: false,
        tabHidden: false,
        dynamicNewTab: false,
        noKeepAlive: false,
        activeMenu: false
      }
    }
  ]
}
export default settings
