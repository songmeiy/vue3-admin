import Layout from '@/layout/layouts'
const test = {
  path: '/test',
  name: 'Test',
  component: Layout,
  redirect: '/test/index',
  meta: {
    title: '测试',
    icon: 'test',
    dynamicNewTab: false,
    noKeepAlive: false
  },
  children: [
    {
      path: 'index',
      name: 'TestIndex',
      component: () => import('@/views/test/index'),
      meta: {
        title: '错误测试',
        icon: '404',
        noKeepAlive: false
      }
    }
  ]
}
export default test
