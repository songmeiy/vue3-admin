import Layout from '@/layout/layouts'
const test = {
  path: '/test',
  name: 'Test',
  component: Layout,
  redirect: '/test/index',
  hidden: false,
  alwaysShow: false,
  meta: {
    title: '测试',
    isCustomSvg: true,
    icon: 'test',
    roles: [],
    badge: '',
    dot: false,
    tabHidden: false,
    dynamicNewTab: false,
    noKeepAlive: false,
    activeMenu: false
  },
  children: [
    {
      path: 'index',
      name: 'TestIndex',
      hidden: false,
      alwaysShow: false,
      redirect: '',
      component: () => import('@/views/test/index'),
      meta: {
        title: '错误测试',
        icon: '404',
        isCustomSvg: true,
        roles: [],
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
export default test
