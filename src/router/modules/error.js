import Layout from '@/layout/layouts'

const error = {
  path: '/error',
  name: 'ErrorPage',
  component: Layout,
  redirect: '/error/404',
  meta: {
    title: '错误页',
    icon: 'error',
    dynamicNewTab: false
  },
  children: [
    {
      path: 'ErrorPage403',
      name: 'ErrorPage403',
      component: () => import('@/views/error/403'),
      meta: {
        title: '403',
        icon: '403'
      },
      children: []
    },
    {
      path: '404',
      name: 'ErrorPage404',
      component: () => import('@/views/error/404'),
      meta: {
        title: 'ErrorPage404',
        icon: '403'
      },
      children: []
    }
  ]
}
export default error
