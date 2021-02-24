import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/layouts'
import demo from '@/router/modules/demo'
import settings from '@/router/modules/settings'
// import error from '@/router/modules/error'
import test from '@/router/modules/test'
export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/error/403'),
    hidden: true
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404'),
    hidden: true
  }
]
export const asyncRoutes = [
  {
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
  },
  demo,
  settings,
  test
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export default router
