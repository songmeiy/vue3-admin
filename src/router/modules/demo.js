import Layout from '@/layout/layouts'

const demo = {
  path: '/demo',
  name: 'Demo',
  component: Layout,
  redirect: '/demo/icon/icons',
  meta: {
    title: '组件',
    icon: 'component',
    dynamicNewTab: false,
    noKeepAlive: false
  },
  children: [
    {
      path: 'icon',
      name: 'Icon',
      component: () => import('@/views/demo/icon'),
      redirect: '/demo/icon/icons',
      meta: {
        title: '图标',
        icon: 'logo',
        noKeepAlive: false
      },
      children: [
        {
          path: 'icons',
          name: 'Svgs',
          component: () => import('@/views/demo/icon/svgs'),
          meta: {
            title: 'SVG图标',
            icon: 'svg',
            noKeepAlive: false
          }
        },
        {
          path: 'elementIcons',
          name: 'ElementIcons',
          component: () => import('@/views/demo/icon/elements'),
          meta: {
            title: 'Element图标',
            icon: 'element',
            noKeepAlive: false
          }
        },
        {
          path: 'iconSelector',
          name: 'IconSelector',
          component: () => import('@/views/demo/icon/iconSelector'),
          meta: {
            title: '图标选择器',
            icon: 'select',
            noKeepAlive: false
          }
        }
      ]
    },
    {
      path: 'table',
      name: 'Table',
      component: () => import('@/views/demo/table'),
      redirect: '/demo/table/customTable',
      meta: {
        title: '表格',
        icon: 'table',
        noKeepAlive: false
      },
      children: [
        {
          path: 'customTable',
          name: 'CustomTable',
          component: () => import('@/views/demo/table/customTable'),
          meta: {
            title: '自定义表格',
            icon: 'custom',
            noKeepAlive: false
          }
        },
        {
          path: 'inlineTable',
          name: 'InlineTable',
          component: () => import('@/views/demo/table/inlineTable'),
          meta: {
            title: '行内编辑表格',
            icon: 'edit-solid',
            noKeepAlive: false
          }
        }
      ]
    },
    {
      path: 'editor',
      name: 'Editor',
      redirect: 'demo/editor/wangEditor',
      component: () => import('@/views/demo/editor'),
      meta: {
        title: '编辑器',
        icon: 'editor',
        noKeepAlive: false
      },
      children: [
        {
          path: 'wangEditor',
          name: 'WangEditor',
          component: () => import('@/views/demo/editor/wangEditor'),
          meta: {
            title: '富文本编辑器',
            icon: 'rich-text',
            noKeepAlive: false
          }
        },
        {
          path: 'markdownEditor',
          name: 'MarkdownEditor',
          component: () => import('@/views/demo/editor/markdownEditor'),
          meta: {
            title: 'MarkDown编辑器',
            icon: 'markdown',
            noKeepAlive: false
          }
        }
      ]
    },
    {
      path: 'ElementPlus',
      name: 'ElementPlus',
      component: () => import('@/views/demo/ElementPlus'),
      redirect: '/demo/ElementPlus/message',
      meta: {
        title: 'ElementPlus',
        icon: 'element',
        noKeepAlive: false
      },
      children: [
        {
          path: 'notification',
          name: 'ElementPlusNotification',
          component: () => import('@/views/demo/ElementPlus/notification'),
          meta: {
            title: '通知',
            icon: 'notification',
            noKeepAlive: false
          }
        },
        {
          path: 'message',
          name: 'ElementPlusMessage',
          component: () => import('@/views/demo/ElementPlus/message'),
          meta: {
            title: '消息提示',
            icon: 'message',
            noKeepAlive: false
          }
        },
        {
          path: 'messageBox',
          name: 'ElementPlusMessageBox',
          component: () => import('@/views/demo/ElementPlus/messageBox'),
          meta: {
            title: 'messageBox',
            icon: 'messageBox',
            noKeepAlive: false
          }
        },
        {
          path: 'loading',
          name: 'ElementPlusLoading',
          component: () => import('@/views/demo/ElementPlus/loading'),
          meta: {
            title: 'loading',
            icon: 'loading',
            noKeepAlive: false
          }
        }
      ]
    },
    {
      path: 'meta',
      name: 'Meta',
      component: () => import('@/views/demo/meta'),
      redirect: '/demo/meta/button',
      meta: {
        title: '路由参数',
        icon: 'router'
      },
      children: [
        {
          path: 'button',
          name: 'MetaButton',
          component: () => import('@/views/demo/meta/button'),
          meta: {
            title: '操作',
            icon: 'show'
          }
        },
        {
          path: 'dynamicMeta',
          name: 'DynamicMeta',
          component: () => import('@/views/demo/meta/dynamicMeta'),
          meta: {
            title: '动态Meta',
            roles: ['admin'],
            icon: 'dynamicMeta',
            badge: '0'
          }
        },
        {
          path: 'metaAllHidden',
          name: 'MetaAllHidden',
          hidden: true,
          component: () => import('@/views/demo/meta/allHidden'),
          meta: {
            title: 'Menu&Tag',
            icon: 'router',
            tabHidden: true
          }
        },
        {
          path: 'metaTagHidden',
          name: 'MetaTagHidden',
          component: () => import('@/views/demo/meta/tagHidden'),
          meta: {
            title: '隐藏Tag',
            icon: 'tag',
            tabHidden: true
          }
        },
        {
          path: 'metaMenuHidden',
          name: 'MetaMenuHidden',
          hidden: true,
          component: () => import('@/views/demo/meta/menuHidden'),
          meta: {
            title: '隐藏Menu',
            icon: 'router'
          }
        }
      ]
    },
    {
      path: 'nested',
      name: 'Nested',
      component: () => import('@/views/demo/nested'),
      redirect: '/demo/nested/nested-1/nested-1-1/nested-1-1-1',
      alwaysShow: true,
      meta: {
        title: '路由缓存',
        roles: ['admin'],
        icon: 'nested',
        noKeepAlive: false
      },
      children: [
        {
          path: 'nested-1',
          name: 'Nested-1',
          component: () => import('@/views/demo/nested/nested1'),
          redirect: '/demo/nested/nested-1/nested-1-1/nested-1-1-1',
          alwaysShow: true,
          meta: {
            title: '多级路由-1',
            noKeepAlive: false
          },
          children: [
            {
              path: 'nested-1-1',
              name: 'Nested11',
              component: () => import('@/views/demo/nested/nested1/nested1-1'),
              redirect: '/demo/nested/nested-1/nested-1-1/nested-1-1-1',
              alwaysShow: true,
              meta: {
                title: '多级路由-1-1',
                noKeepAlive: false
              },
              children: [
                {
                  path: 'nested-1-1-1',
                  name: 'Nested111',
                  meta: {
                    title: '多级路由-1-1-1',
                    noKeepAlive: false
                  },
                  component: () => import('@/views/demo/nested/nested1/nested1-1/nested1-1-1'),
                  children: [
                    {
                      path: 'nested-1-1-1-1',
                      name: 'Nested1111',
                      meta: {
                        title: '多级路由-1-1-1-1',
                        noKeepAlive: false
                      },
                      component: () => import('@/views/demo/nested/nested1/nested1-1/nested1-1-1/nested1-1-1-1')
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
export default demo
