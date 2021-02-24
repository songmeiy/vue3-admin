import Layout from '@/layout/layouts'

const home = {
  path: '/',
  name: 'Root',
  component: Layout,
  redirect: '/index',
  meta: {
    title: '首页',
    icon: 'home',
    dynamicNewTab: false,
    noKeepAlive: false
  },
  children: [
    {
      path: 'index',
      name: 'Home',
      component: () => import('@/views/home'),
      meta: {
        title: '首页',
        icon: 'home',
        affix: true,
        dynamicNewTab: false,
        noKeepAlive: false
      }
    },
    {
      path: 'workbench',
      name: 'Workbench',
      component: () => import('@/views/home/workbench'),
      meta: {
        title: '工作台',
        icon: 'workbench',
        dot: true,
        dynamicNewTab: true,
        noKeepAlive: false
      }
    }
  ]
}
export default home
