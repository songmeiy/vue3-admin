import Layout from '@/layout/layouts'

const demo = {
  path: '/demo',
  name: 'Demo',
  component: Layout,
  hidden: false,
  redirect: '/demo/icon/icons',
  alwaysShow: false,
  meta: {
    title: '组件',
    isCustomSvg: true,
    icon: 'component',
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
      path: 'icon',
      name: 'Icon',
      component: () => import('@/views/demo/icon'),
      hidden: false,
      alwaysShow: false,
      redirect: '/demo/icon/icons',
      meta: {
        title: '图标',
        isCustomSvg: true,
        icon: 'logo',
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
          path: 'icons',
          name: 'Svgs',
          hidden: false,
          alwaysShow: false,
          redirect: '',
          component: () => import('@/views/demo/icon/svgs'),
          meta: {
            title: 'SVG图标',
            isCustomSvg: true,
            icon: 'svg',
            roles: [],
            badge: '',
            dot: false,
            tabHidden: false,
            dynamicNewTab: false,
            noKeepAlive: false,
            activeMenu: false
          },
          children: []
        },
        {
          path: 'elementIcons',
          name: 'ElementIcons',
          hidden: false,
          alwaysShow: false,
          redirect: '',
          component: () => import('@/views/demo/icon/elements'),
          meta: {
            title: 'Element图标',
            isCustomSvg: true,
            icon: 'element',
            roles: [],
            badge: '',
            dot: false,
            tabHidden: false,
            dynamicNewTab: false,
            noKeepAlive: false,
            activeMenu: false
          },
          children: []
        },
        {
          path: 'iconSelector',
          name: 'IconSelector',
          hidden: false,
          alwaysShow: false,
          redirect: '',
          component: () => import('@/views/demo/icon/iconSelector'),
          meta: {
            title: '图标选择器',
            isCustomSvg: true,
            icon: 'select',
            roles: [],
            badge: '',
            dot: false,
            tabHidden: false,
            dynamicNewTab: false,
            noKeepAlive: false,
            activeMenu: false
          },
          children: []
        }
      ]
    },
    {
      path: 'table',
      name: 'Table',
      component: () => import('@/views/demo/table'),
      redirect: '/demo/table/comprehensive',
      hidden: false,
      alwaysShow: false,
      meta: {
        title: '表格',
        isCustomSvg: true,
        icon: 'table',
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
          path: 'tree',
          name: 'TreeTable',
          hidden: false,
          alwaysShow: false,
          redirect: '',
          component: () => import('@/views/demo/table/tree'),
          meta: {
            affix: false,
            title: '树形表格',
            isCustomSvg: true,
            icon: 'tree',
            roles: [],
            badge: '',
            dot: false,
            tabHidden: false,
            dynamicNewTab: false,
            noKeepAlive: false,
            activeMenu: false,
            parentName: 'TableIndex'
          },
          children: []
        },
        {
          path: 'comprehensive',
          name: 'ComprehensiveTable',
          hidden: false,
          alwaysShow: false,
          redirect: '',
          component: () => import('@/views/demo/table/comprehensive'),
          meta: {
            title: '综合表格',
            isCustomSvg: true,
            icon: 'comprehensive',
            roles: [],
            badge: '',
            dot: false,
            tabHidden: false,
            dynamicNewTab: false,
            noKeepAlive: false,
            activeMenu: false
          },
          children: []
        },
        {
          path: 'custom',
          name: 'CustomTable',
          hidden: false,
          alwaysShow: false,
          redirect: '',
          component: () => import('@/views/demo/table/custom'),
          meta: {
            title: '自定义表格',
            isCustomSvg: true,
            icon: 'custom',
            roles: [],
            badge: '',
            dot: false,
            tabHidden: false,
            dynamicNewTab: false,
            noKeepAlive: false,
            activeMenu: false
          },
          children: []
        },
        {
          path: 'inline',
          name: 'InlineTable',
          hidden: false,
          alwaysShow: false,
          redirect: '',
          component: () => import('@/views/demo/table/inline'),
          meta: {
            title: '行内编辑表格',
            isCustomSvg: true,
            icon: 'edit-solid',
            roles: [],
            badge: '',
            dot: false,
            tabHidden: false,
            dynamicNewTab: false,
            noKeepAlive: false,
            activeMenu: false
          },
          children: []
        },
        {
          path: 'detail',
          name: 'TableDetail',
          hidden: true,
          alwaysShow: false,
          redirect: '',
          component: () => import('@/views/demo/table/detail'),
          meta: {
            title: '详情',
            icon: 'edit-solid',
            isCustomSvg: true,
            roles: [],
            badge: '',
            dot: false,
            tabHidden: false,
            dynamicNewTab: false,
            noKeepAlive: false,
            activeMenu: false
          },
          children: []
        }
      ]
    },
    {
      path: 'form',
      name: 'Form',
      hidden: false,
      alwaysShow: false,
      component: () => import('@/views/demo/form'),
      redirect: '/demo/form/comprehensive',
      meta: {
        isCustomSvg: true,
        icon: 'form',
        title: '表单',
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
          path: 'comprehensive',
          name: 'ComprehensiveForm',
          hidden: false,
          alwaysShow: false,
          redirect: '',
          component: () => import('@/views/demo/form/comprehensive'),
          meta: {
            isCustomSvg: true,
            icon: 'comprehensive-form',
            title: '综合表单',
            roles: [],
            badge: '',
            dot: false,
            tabHidden: false,
            dynamicNewTab: false,
            noKeepAlive: false,
            activeMenu: false
          },
          children: []
        },
        {
          path: 'steps',
          name: 'StepsForm',
          hidden: false,
          alwaysShow: false,
          redirect: '',
          component: () => import('@/views/demo/form/steps'),
          meta: {
            isCustomSvg: true,
            icon: 'steps',
            title: '分步表单',
            roles: [],
            badge: '',
            dot: false,
            tabHidden: false,
            dynamicNewTab: false,
            noKeepAlive: false,
            activeMenu: false
          },
          children: []
        }
      ]
    },
    {
      path: 'card',
      name: 'Card',
      hidden: false,
      alwaysShow: false,
      redirect: '',
      component: () => import('@/views/demo/card'),
      meta: {
        title: '卡片',
        isCustomSvg: true,
        icon: 'card',
        roles: [],
        badge: '',
        dot: false,
        tabHidden: false,
        dynamicNewTab: false,
        noKeepAlive: false,
        activeMenu: false
      },
      children: []
    },
    {
      path: 'timeline',
      name: 'TimeLine',
      hidden: false,
      alwaysShow: false,
      redirect: '',
      component: () => import('@/views/demo/timeline'),
      meta: {
        title: '时间线',
        isCustomSvg: true,
        icon: 'timeline',
        roles: [],
        badge: '',
        dot: false,
        tabHidden: false,
        dynamicNewTab: false,
        noKeepAlive: false,
        activeMenu: false
      },
      children: []
    },
    {
      path: 'list',
      name: 'List',
      hidden: false,
      alwaysShow: false,
      redirect: '',
      component: () => import('@/views/demo/list'),
      meta: {
        title: '列表',
        isCustomSvg: true,
        icon: 'stream-list',
        roles: [],
        badge: '',
        dot: false,
        tabHidden: false,
        dynamicNewTab: false,
        noKeepAlive: false,
        activeMenu: false
      },
      children: []
    },
    {
      path: 'editor',
      name: 'Editor',
      hidden: false,
      alwaysShow: false,
      redirect: 'demo/editor/wangEditor',
      component: () => import('@/views/demo/editor'),
      meta: {
        title: '编辑器',
        isCustomSvg: true,
        icon: 'editor',
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
          path: 'wangEditor',
          name: 'WangEditor',
          hidden: false,
          alwaysShow: false,
          redirect: '',
          component: () => import('@/views/demo/editor/wangEditor'),
          meta: {
            title: '富文本编辑器',
            isCustomSvg: true,
            icon: 'rich-text',
            roles: [],
            badge: '',
            dot: false,
            tabHidden: false,
            dynamicNewTab: false,
            noKeepAlive: false,
            activeMenu: false
          },
          children: []
        },
        {
          path: 'markdownEditor',
          name: 'MarkdownEditor',
          hidden: false,
          alwaysShow: false,
          redirect: '',
          component: () => import('@/views/demo/editor/markdownEditor'),
          meta: {
            title: 'MarkDown编辑器',
            isCustomSvg: true,
            icon: 'markdown',
            roles: [],
            badge: '',
            dot: false,
            tabHidden: false,
            dynamicNewTab: false,
            noKeepAlive: false,
            activeMenu: false
          },
          children: []
        }
      ]
    },
    {
      path: 'excel',
      name: 'Excel',
      hidden: false,
      alwaysShow: false,
      component: () => import('@/views/demo/excel'),
      redirect: '/demo/excel/export',
      meta: {
        title: 'Excel',
        isCustomSvg: true,
        icon: 'excel',
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
          path: 'export',
          name: 'ExportExcel',
          hidden: false,
          alwaysShow: false,
          redirect: '',
          component: () => import('@/views/demo/excel/export'),
          meta: {
            title: '导出表格',
            isCustomSvg: true,
            icon: 'export',
            roles: [],
            badge: '',
            dot: false,
            tabHidden: false,
            dynamicNewTab: false,
            noKeepAlive: false,
            activeMenu: false
          },
          children: []
        },
        {
          path: 'selected',
          name: 'ExportSelectedExcel',
          hidden: false,
          alwaysShow: false,
          redirect: '',
          component: () => import('@/views/demo/excel/selected'),
          meta: {
            title: '导出选中数据',
            isCustomSvg: true,
            icon: 'select',
            roles: [],
            badge: '',
            dot: false,
            tabHidden: false,
            dynamicNewTab: false,
            noKeepAlive: false,
            activeMenu: false
          },
          children: []
        },
        {
          path: 'merge',
          name: 'ExportMergeHeaderExcel',
          hidden: false,
          alwaysShow: false,
          redirect: '',
          component: () => import('@/views/demo/excel/merge'),
          meta: {
            title: '导出合并表格',
            isCustomSvg: true,
            icon: 'merge',
            roles: [],
            badge: '',
            dot: false,
            tabHidden: false,
            dynamicNewTab: false,
            noKeepAlive: false,
            activeMenu: false
          },
          children: []
        }
      ]
    },
    {
      path: 'ElementPlus',
      name: 'ElementPlus',
      hidden: false,
      alwaysShow: false,
      component: () => import('@/views/demo/ElementPlus'),
      redirect: '/demo/ElementPlus/message',
      meta: {
        title: 'ElementPlus',
        isCustomSvg: true,
        icon: 'element',
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
          path: 'notification',
          name: 'ElementPlusNotification',
          hidden: false,
          alwaysShow: false,
          redirect: '',
          component: () => import('@/views/demo/ElementPlus/notification'),
          meta: {
            title: '通知',
            isCustomSvg: true,
            icon: 'notification',
            roles: [],
            badge: '',
            dot: false,
            tabHidden: false,
            dynamicNewTab: false,
            noKeepAlive: false,
            activeMenu: false
          },
          children: []
        },
        {
          path: 'message',
          name: 'ElementPlusMessage',
          hidden: false,
          alwaysShow: false,
          redirect: '',
          component: () => import('@/views/demo/ElementPlus/message'),
          meta: {
            title: '消息提示',
            isCustomSvg: true,
            icon: 'message',
            roles: [],
            badge: '',
            dot: false,
            tabHidden: false,
            dynamicNewTab: false,
            noKeepAlive: false,
            activeMenu: false
          },
          children: []
        },
        {
          path: 'messageBox',
          name: 'ElementPlusMessageBox',
          hidden: false,
          alwaysShow: false,
          redirect: '',
          component: () => import('@/views/demo/ElementPlus/messageBox'),
          meta: {
            title: 'messageBox',
            isCustomSvg: true,
            icon: 'messageBox',
            roles: [],
            badge: '',
            dot: false,
            tabHidden: false,
            dynamicNewTab: false,
            noKeepAlive: false,
            activeMenu: false
          },
          children: []
        },
        {
          path: 'loading',
          name: 'ElementPlusLoading',
          hidden: false,
          alwaysShow: false,
          redirect: '',
          component: () => import('@/views/demo/ElementPlus/loading'),
          meta: {
            title: 'loading',
            isCustomSvg: true,
            icon: 'loading',
            roles: [],
            badge: '',
            dot: false,
            tabHidden: false,
            dynamicNewTab: false,
            noKeepAlive: false,
            activeMenu: false
          },
          children: []
        }
      ]
    },
    {
      path: 'meta',
      name: 'Meta',
      hidden: false,
      alwaysShow: false,
      component: () => import('@/views/demo/meta'),
      redirect: '/demo/meta/button',
      meta: {
        title: '路由参数',
        isCustomSvg: true,
        icon: 'router',
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
          name: 'MetaIndex',
          hidden: false,
          alwaysShow: false,
          redirect: '',
          component: () => import('@/views/demo/meta/meta'),
          meta: {
            title: '测试',
            isCustomSvg: true,
            icon: 'show',
            roles: [],
            badge: '',
            dot: false,
            tabHidden: false,
            dynamicNewTab: false,
            noKeepAlive: false,
            activeMenu: false
          },
          children: []
        },
        {
          path: 'dynamicMeta',
          name: 'DynamicMeta',
          hidden: false,
          alwaysShow: false,
          redirect: '',
          component: () => import('@/views/demo/meta/dynamicMeta'),
          meta: {
            title: '动态Meta',
            roles: ['admin'],
            isCustomSvg: true,
            icon: 'dynamicMeta',
            badge: '0',
            dot: false,
            tabHidden: false,
            dynamicNewTab: false,
            noKeepAlive: false,
            activeMenu: false
          },
          children: []
        },
        {
          path: 'metaAllHidden',
          name: 'MetaAllHidden',
          hidden: true,
          alwaysShow: false,
          redirect: '',
          component: () => import('@/views/demo/meta/allHidden'),
          meta: {
            title: 'Menu&Tag',
            isCustomSvg: true,
            icon: 'router',
            tabHidden: true,
            roles: [],
            badge: '',
            dot: false,
            dynamicNewTab: false,
            noKeepAlive: false,
            activeMenu: false
          },
          children: []
        },
        {
          path: 'metaTagHidden',
          name: 'MetaTagHidden',
          hidden: false,
          alwaysShow: false,
          redirect: '',
          component: () => import('@/views/demo/meta/tagHidden'),
          meta: {
            title: '隐藏Tag',
            isCustomSvg: true,
            icon: 'tag',
            roles: [],
            badge: '',
            dot: false,
            tabHidden: false,
            dynamicNewTab: false,
            noKeepAlive: false,
            activeMenu: false
          },
          children: []
        },
        {
          path: 'metaMenuHidden',
          name: 'MetaMenuHidden',
          hidden: true,
          alwaysShow: false,
          redirect: '',
          component: () => import('@/views/demo/meta/menuHidden'),
          meta: {
            title: '隐藏Menu',
            isCustomSvg: true,
            icon: 'router',
            roles: [],
            badge: '',
            dot: false,
            tabHidden: false,
            dynamicNewTab: false,
            noKeepAlive: false,
            activeMenu: false
          },
          children: []
        }
      ]
    },
    {
      path: 'dynamicSegment',
      name: 'DynamicSegment',
      hidden: false,
      alwaysShow: false,
      redirect: '',
      component: () => import('@/views/demo/dynamicSegment/index'),
      meta: {
        title: '路由传参',
        isCustomSvg: true,
        icon: 'arrow-left-right-line',
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
          name: 'DynamicSegmentIndex',
          hidden: false,
          alwaysShow: false,
          redirect: '',
          component: () => import('@/views/demo/dynamicSegment/dynamicSegment'),
          meta: {
            title: '路由传参',
            isCustomSvg: true,
            icon: 'arrow-left-right-line',
            roles: [],
            badge: '',
            dot: false,
            tabHidden: false,
            dynamicNewTab: false,
            noKeepAlive: false,
            activeMenu: false
          },
          children: []
        },
        {
          path: 'query',
          name: 'DynamicSegmentQuery',
          alwaysShow: false,
          redirect: '',
          component: () => import('@/views/demo/dynamicSegment/query'),
          hidden: true,
          meta: {
            title: 'query',
            isCustomSvg: true,
            icon: 'query',
            roles: [],
            badge: '',
            dot: false,
            tabHidden: false,
            dynamicNewTab: false,
            noKeepAlive: false,
            activeMenu: false
          },
          children: []
        },
        {
          path: 'params',
          name: 'DynamicSegmentParam',
          alwaysShow: false,
          redirect: '',
          component: () => import('@/views/demo/dynamicSegment/params'),
          hidden: true,
          meta: {
            title: 'params',
            isCustomSvg: true,
            icon: 'params',
            roles: [],
            badge: '',
            dot: false,
            tabHidden: false,
            dynamicNewTab: false,
            noKeepAlive: false,
            activeMenu: false
          },
          children: []
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
              alwaysShow: true,
              component: () => import('@/views/demo/nested/nested1/nested1-1'),
              redirect: '/demo/nested/nested-1/nested-1-1/nested-1-1-1',
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
                  alwaysShow: true,
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
    },
    {
      path: 'https://github.com/zepingwong/vue3-admin',
      name: 'ExternalLink',
      hidden: false,
      alwaysShow: false,
      redirect: '',
      component: '',
      meta: {
        title: '外链',
        target: '_blank',
        isCustomSvg: true,
        icon: 'external-link',
        roles: [],
        badge: '',
        dot: false,
        tabHidden: false,
        dynamicNewTab: false,
        noKeepAlive: false,
        activeMenu: false
      },
      children: []
    }
  ]
}
export default demo
