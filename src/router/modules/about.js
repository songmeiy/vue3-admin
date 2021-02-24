import Layout from '@/layout/layouts'

const about = {
  path: '/about',
  name: 'About',
  component: Layout,
  redirect: '/about/index',
  meta: {
    title: '关于',
    icon: 'about'
  },
  children: [
    {
      path: 'index',
      name: 'AboutIndex',
      component: () => import('@/views/about/index'),
      meta: {
        title: '关于',
        icon: 'about'
      }
    }
  ]
}
export default about
