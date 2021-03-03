import Layout from '@/layout/layouts'

const about = {
  path: '/about',
  name: 'About',
  component: Layout,
  hidden: false,
  alwaysShow: false,
  redirect: '/about/index',
  meta: {
    title: '关于',
    isCustomSvg: true,
    icon: 'about',
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
      name: 'AboutIndex',
      hidden: false,
      alwaysShow: false,
      redirect: '',
      component: () => import('@/views/about/index'),
      meta: {
        title: '关于',
        isCustomSvg: true,
        icon: 'about',
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
export default about
