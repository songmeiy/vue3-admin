import { createRouter, createWebHashHistory } from 'vue-router'
import home from '@/router/modules/home'
import demo from '@/router/modules/demo'
import settings from '@/router/modules/settings'
// import error from '@/router/modules/error'
import test from '@/router/modules/test'
import about from '@/router/modules/about'
export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login'),
    hidden: true,
    meta: {
      title: '登录页'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register'),
    hidden: true,
    meta: {
      title: '注册页'
    }
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/error/403'),
    hidden: true,
    meta: {
      title: '403'
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404'),
    hidden: true,
    meta: {
      title: '404'
    }
  }
]
export const asyncRoutes = [
  home,
  demo,
  settings,
  test,
  about
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export default router
