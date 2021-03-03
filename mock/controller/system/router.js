const router = [
  {
    path: '/',
    name: 'Root',
    component: 'Layout',
    redirect: '/home',
    hidden: false,
    alwaysShow: false,
    meta: {
      affix: false,
      title: '首页',
      isCustomSvg: true,
      icon: 'home',
      roles: [],
      badge: '',
      dot: false,
      tabHidden: false,
      dynamicNewTab: false,
      noKeepAlive: false,
      activeMenu: false,
      parentName: ''
    },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: '@/views/home/home',
        alwaysShow: false,
        redirect: '',
        meta: {
          affix: true,
          title: '首页',
          isCustomSvg: true,
          icon: 'home',
          roles: [],
          badge: '',
          dot: false,
          tabHidden: false,
          dynamicNewTab: false,
          noKeepAlive: false,
          activeMenu: false,
          parentName: 'Root'
        },
        children: []
      },
      {
        path: 'workbench',
        name: 'Workbench',
        component: '@/views/home/workbench',
        alwaysShow: false,
        redirect: '',
        meta: {
          affix: false,
          title: '工作台',
          isCustomSvg: true,
          icon: 'workbench',
          roles: [],
          badge: '',
          dot: false,
          tabHidden: false,
          dynamicNewTab: false,
          noKeepAlive: false,
          activeMenu: false,
          parentName: 'Root'
        },
        children: []
      }
    ]
  },
  {
    path: '/demo',
    name: 'Demo',
    component: 'Layout',
    hidden: false,
    redirect: '/demo/icon/icons',
    alwaysShow: false,
    meta: {
      affix: false,
      title: '组件',
      isCustomSvg: true,
      icon: 'component',
      roles: [],
      badge: '',
      dot: false,
      tabHidden: false,
      dynamicNewTab: false,
      noKeepAlive: false,
      activeMenu: false,
      parentName: ''
    },
    children: [
      {
        path: 'icon',
        name: 'IconIndex',
        component: '@/views/demo/icon',
        hidden: false,
        alwaysShow: false,
        redirect: '/demo/icon/icons',
        meta: {
          affix: false,
          title: '图标',
          isCustomSvg: true,
          icon: 'logo',
          roles: [],
          badge: '',
          dot: false,
          tabHidden: false,
          dynamicNewTab: false,
          noKeepAlive: false,
          activeMenu: false,
          parentName: 'Demo'
        },
        children: [
          {
            path: 'icons',
            name: 'Svgs',
            hidden: false,
            alwaysShow: false,
            redirect: '',
            component: '@/views/demo/icon/svgs',
            meta: {
              affix: false,
              title: 'SVG图标',
              isCustomSvg: true,
              icon: 'svg',
              roles: [],
              badge: '',
              dot: false,
              tabHidden: false,
              dynamicNewTab: false,
              noKeepAlive: false,
              activeMenu: false,
              parentName: 'IconIndex'
            },
            children: []
          },
          {
            path: 'elementIcons',
            name: 'ElementIcons',
            hidden: false,
            alwaysShow: false,
            redirect: '',
            component: '@/views/demo/icon/elements',
            meta: {
              affix: false,
              title: 'Element图标',
              isCustomSvg: true,
              icon: 'element',
              roles: [],
              badge: '',
              dot: false,
              tabHidden: false,
              dynamicNewTab: false,
              noKeepAlive: false,
              activeMenu: false,
              parentName: 'IconIndex'
            },
            children: []
          },
          {
            path: 'iconSelector',
            name: 'IconSelector',
            hidden: false,
            alwaysShow: false,
            redirect: '',
            component: '@/views/demo/icon/iconSelector',
            meta: {
              affix: false,
              title: '图标选择器',
              isCustomSvg: true,
              icon: 'select',
              roles: [],
              badge: '',
              dot: false,
              tabHidden: false,
              dynamicNewTab: false,
              noKeepAlive: false,
              activeMenu: false,
              parentName: 'IconIndex'
            },
            children: []
          }
        ]
      },
      {
        path: 'table',
        name: 'TableIndex',
        component: '@/views/demo/table',
        redirect: '/demo/table/comprehensive',
        hidden: false,
        alwaysShow: false,
        meta: {
          affix: false,
          title: '表格',
          isCustomSvg: true,
          icon: 'table',
          roles: [],
          badge: '',
          dot: false,
          tabHidden: false,
          dynamicNewTab: false,
          noKeepAlive: false,
          activeMenu: false,
          parentName: 'Demo'
        },
        children: [
          {
            path: 'comprehensive',
            name: 'ComprehensiveTable',
            hidden: false,
            alwaysShow: false,
            redirect: '',
            component: '@/views/demo/table/comprehensive',
            meta: {
              affix: false,
              title: '综合表格',
              isCustomSvg: true,
              icon: 'comprehensive',
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
            path: 'custom',
            name: 'CustomTable',
            hidden: false,
            alwaysShow: false,
            redirect: '',
            component: '@/views/demo/table/custom',
            meta: {
              affix: false,
              title: '自定义表格',
              isCustomSvg: true,
              icon: 'custom',
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
            path: 'inline',
            name: 'InlineTable',
            hidden: false,
            alwaysShow: false,
            redirect: '',
            component: '@/views/demo/table/inline',
            meta: {
              affix: false,
              title: '行内编辑表格',
              isCustomSvg: true,
              icon: 'edit-solid',
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
            path: 'detail',
            name: 'TableDetail',
            hidden: true,
            alwaysShow: false,
            redirect: '',
            component: '@/views/demo/table/detail',
            meta: {
              affix: false,
              title: '详情',
              icon: 'edit-solid',
              isCustomSvg: true,
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
          }
        ]
      },
      {
        path: 'form',
        name: 'FormIndex',
        hidden: false,
        alwaysShow: false,
        component: '@/views/demo/form',
        redirect: '/demo/form/comprehensive',
        meta: {
          affix: false,
          isCustomSvg: true,
          icon: 'form',
          title: '表单',
          roles: [],
          badge: '',
          dot: false,
          tabHidden: false,
          dynamicNewTab: false,
          noKeepAlive: false,
          activeMenu: false,
          parentName: 'Demo'
        },
        children: [
          {
            path: 'comprehensive',
            name: 'ComprehensiveForm',
            hidden: false,
            alwaysShow: false,
            redirect: '',
            component: '@/views/demo/form/comprehensive',
            meta: {
              affix: false,
              isCustomSvg: true,
              icon: 'comprehensive-form',
              title: '综合表单',
              roles: [],
              badge: '',
              dot: false,
              tabHidden: false,
              dynamicNewTab: false,
              noKeepAlive: false,
              activeMenu: false,
              parentName: 'FormIndex'
            },
            children: []
          },
          {
            path: 'steps',
            name: 'StepsForm',
            hidden: false,
            alwaysShow: false,
            redirect: '',
            component: '@/views/demo/form/steps',
            meta: {
              affix: false,
              isCustomSvg: true,
              icon: 'steps',
              title: '分步表单',
              roles: [],
              badge: '',
              dot: false,
              tabHidden: false,
              dynamicNewTab: false,
              noKeepAlive: false,
              activeMenu: false,
              parentName: 'FormIndex'
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
        component: '@/views/demo/card',
        meta: {
          affix: false,
          title: '卡片',
          isCustomSvg: true,
          icon: 'card',
          roles: [],
          badge: '',
          dot: false,
          tabHidden: false,
          dynamicNewTab: false,
          noKeepAlive: false,
          activeMenu: false,
          parentName: 'Demo'
        },
        children: []
      },
      {
        path: 'timeline',
        name: 'TimeLine',
        hidden: false,
        alwaysShow: false,
        redirect: '',
        component: '@/views/demo/timeline',
        meta: {
          affix: false,
          title: '时间线',
          isCustomSvg: true,
          icon: 'timeline',
          roles: [],
          badge: '',
          dot: false,
          tabHidden: false,
          dynamicNewTab: false,
          noKeepAlive: false,
          activeMenu: false,
          parentName: 'Demo'
        },
        children: []
      },
      {
        path: 'list',
        name: 'List',
        hidden: false,
        alwaysShow: false,
        redirect: '',
        component: '@/views/demo/list',
        meta: {
          affix: false,
          title: '列表',
          isCustomSvg: true,
          icon: 'stream-list',
          roles: [],
          badge: '',
          dot: false,
          tabHidden: false,
          dynamicNewTab: false,
          noKeepAlive: false,
          activeMenu: false,
          parentName: 'Demo'
        },
        children: []
      },
      {
        path: 'editor',
        name: 'EditorIndex',
        hidden: false,
        alwaysShow: false,
        redirect: 'demo/editor/wangEditor',
        component: '@/views/demo/editor',
        meta: {
          affix: false,
          title: '编辑器',
          isCustomSvg: true,
          icon: 'editor',
          roles: [],
          badge: '',
          dot: false,
          tabHidden: false,
          dynamicNewTab: false,
          noKeepAlive: false,
          activeMenu: false,
          parentName: 'Demo'
        },
        children: [
          {
            path: 'wangEditor',
            name: 'WangEditor',
            hidden: false,
            alwaysShow: false,
            redirect: '',
            component: '@/views/demo/editor/wangEditor',
            meta: {
              affix: false,
              title: '富文本编辑器',
              isCustomSvg: true,
              icon: 'rich-text',
              roles: [],
              badge: '',
              dot: false,
              tabHidden: false,
              dynamicNewTab: false,
              noKeepAlive: false,
              activeMenu: false,
              parentName: 'EditorIndex'
            },
            children: []
          },
          {
            path: 'markdownEditor',
            name: 'MarkdownEditor',
            hidden: false,
            alwaysShow: false,
            redirect: '',
            component: '@/views/demo/editor/markdownEditor',
            meta: {
              affix: false,
              title: 'MarkDown编辑器',
              isCustomSvg: true,
              icon: 'markdown',
              roles: [],
              badge: '',
              dot: false,
              tabHidden: false,
              dynamicNewTab: false,
              noKeepAlive: false,
              activeMenu: false,
              parentName: 'EditorIndex'
            },
            children: []
          }
        ]
      },
      {
        path: 'excel',
        name: 'ExcelIndex',
        hidden: false,
        alwaysShow: false,
        component: '@/views/demo/excel',
        redirect: '/demo/excel/export',
        meta: {
          affix: false,
          title: 'Excel',
          isCustomSvg: true,
          icon: 'excel',
          roles: [],
          badge: '',
          dot: false,
          tabHidden: false,
          dynamicNewTab: false,
          noKeepAlive: false,
          activeMenu: false,
          parentName: 'Demo'
        },
        children: [
          {
            path: 'export',
            name: 'ExportExcel',
            hidden: false,
            alwaysShow: false,
            redirect: '',
            component: '@/views/demo/excel/export',
            meta: {
              affix: false,
              title: '导出表格',
              isCustomSvg: true,
              icon: 'export',
              roles: [],
              badge: '',
              dot: false,
              tabHidden: false,
              dynamicNewTab: false,
              noKeepAlive: false,
              activeMenu: false,
              parentName: 'ExcelIndex'
            },
            children: []
          },
          {
            path: 'selected',
            name: 'ExportSelectedExcel',
            hidden: false,
            alwaysShow: false,
            redirect: '',
            component: '@/views/demo/excel/selected',
            meta: {
              affix: false,
              title: '导出选中数据',
              isCustomSvg: true,
              icon: 'select',
              roles: [],
              badge: '',
              dot: false,
              tabHidden: false,
              dynamicNewTab: false,
              noKeepAlive: false,
              activeMenu: false,
              parentName: 'ExcelIndex'
            },
            children: []
          },
          {
            path: 'merge',
            name: 'ExportMergeHeaderExcel',
            hidden: false,
            alwaysShow: false,
            redirect: '',
            component: '@/views/demo/excel/merge',
            meta: {
              affix: false,
              title: '导出合并表格',
              isCustomSvg: true,
              icon: 'merge',
              roles: [],
              badge: '',
              dot: false,
              tabHidden: false,
              dynamicNewTab: false,
              noKeepAlive: false,
              activeMenu: false,
              parentName: 'ExcelIndex'
            },
            children: []
          }
        ]
      },
      {
        path: 'ElementPlus',
        name: 'ElementPlusIndex',
        hidden: false,
        alwaysShow: false,
        component: '@/views/demo/ElementPlus',
        redirect: '/demo/ElementPlus/message',
        meta: {
          affix: false,
          title: 'ElementPlus',
          isCustomSvg: true,
          icon: 'element',
          roles: [],
          badge: '',
          dot: false,
          tabHidden: false,
          dynamicNewTab: false,
          noKeepAlive: false,
          activeMenu: false,
          parentName: 'Demo'
        },
        children: [
          {
            path: 'notification',
            name: 'ElementPlusNotification',
            hidden: false,
            alwaysShow: false,
            redirect: '',
            component: '@/views/demo/ElementPlus/notification',
            meta: {
              affix: false,
              title: '通知',
              isCustomSvg: true,
              icon: 'notification',
              roles: [],
              badge: '',
              dot: false,
              tabHidden: false,
              dynamicNewTab: false,
              noKeepAlive: false,
              activeMenu: false,
              parentName: 'ElementPlusIndex'
            },
            children: []
          },
          {
            path: 'message',
            name: 'ElementPlusMessage',
            hidden: false,
            alwaysShow: false,
            redirect: '',
            component: '@/views/demo/ElementPlus/message',
            meta: {
              affix: false,
              title: '消息提示',
              isCustomSvg: true,
              icon: 'message',
              roles: [],
              badge: '',
              dot: false,
              tabHidden: false,
              dynamicNewTab: false,
              noKeepAlive: false,
              activeMenu: false,
              parentName: 'ElementPlusIndex'
            },
            children: []
          },
          {
            path: 'messageBox',
            name: 'ElementPlusMessageBox',
            hidden: false,
            alwaysShow: false,
            redirect: '',
            component: '@/views/demo/ElementPlus/messageBox',
            meta: {
              affix: false,
              title: 'messageBox',
              isCustomSvg: true,
              icon: 'messageBox',
              roles: [],
              badge: '',
              dot: false,
              tabHidden: false,
              dynamicNewTab: false,
              noKeepAlive: false,
              activeMenu: false,
              parentName: 'ElementPlusIndex'
            },
            children: []
          },
          {
            path: 'loading',
            name: 'ElementPlusLoading',
            hidden: false,
            alwaysShow: false,
            redirect: '',
            component: '@/views/demo/ElementPlus/loading',
            meta: {
              affix: false,
              title: 'loading',
              isCustomSvg: true,
              icon: 'loading',
              roles: [],
              badge: '',
              dot: false,
              tabHidden: false,
              dynamicNewTab: false,
              noKeepAlive: false,
              activeMenu: false,
              parentName: 'ElementPlusIndex'
            },
            children: []
          }
        ]
      },
      {
        path: 'meta',
        name: 'MetaIndex',
        hidden: false,
        alwaysShow: false,
        component: '@/views/demo/meta',
        redirect: '/demo/meta/button',
        meta: {
          affix: false,
          title: '路由参数',
          isCustomSvg: true,
          icon: 'router',
          roles: [],
          badge: '',
          dot: false,
          tabHidden: false,
          dynamicNewTab: false,
          noKeepAlive: false,
          activeMenu: false,
          parentName: 'Demo'
        },
        children: [
          {
            path: 'index',
            name: 'MetaIndex',
            hidden: false,
            alwaysShow: false,
            redirect: '',
            component: '@/views/demo/meta/meta',
            meta: {
              affix: false,
              title: '测试',
              isCustomSvg: true,
              icon: 'show',
              roles: [],
              badge: '',
              dot: false,
              tabHidden: false,
              dynamicNewTab: false,
              noKeepAlive: false,
              activeMenu: false,
              parentName: 'MetaIndex'
            },
            children: []
          },
          {
            path: 'dynamicMeta',
            name: 'DynamicMeta',
            hidden: false,
            alwaysShow: false,
            redirect: '',
            component: '@/views/demo/meta/dynamicMeta',
            meta: {
              affix: false,
              title: '动态Meta',
              roles: ['admin'],
              isCustomSvg: true,
              icon: 'dynamicMeta',
              badge: '0',
              dot: false,
              tabHidden: false,
              dynamicNewTab: false,
              noKeepAlive: false,
              activeMenu: false,
              parentName: 'MetaIndex'
            },
            children: []
          },
          {
            path: 'metaAllHidden',
            name: 'MetaAllHidden',
            hidden: true,
            alwaysShow: false,
            redirect: '',
            component: '@/views/demo/meta/allHidden',
            meta: {
              affix: false,
              title: 'Menu&Tag',
              isCustomSvg: true,
              icon: 'router',
              tabHidden: true,
              roles: [],
              badge: '',
              dot: false,
              dynamicNewTab: false,
              noKeepAlive: false,
              activeMenu: false,
              parentName: 'MetaIndex'
            },
            children: []
          },
          {
            path: 'metaTagHidden',
            name: 'MetaTagHidden',
            hidden: false,
            alwaysShow: false,
            redirect: '',
            component: '@/views/demo/meta/tagHidden',
            meta: {
              affix: false,
              title: '隐藏Tag',
              isCustomSvg: true,
              icon: 'tag',
              roles: [],
              badge: '',
              dot: false,
              tabHidden: false,
              dynamicNewTab: false,
              noKeepAlive: false,
              activeMenu: false,
              parentName: 'MetaIndex'
            },
            children: []
          },
          {
            path: 'metaMenuHidden',
            name: 'MetaMenuHidden',
            hidden: true,
            alwaysShow: false,
            redirect: '',
            component: '@/views/demo/meta/menuHidden',
            meta: {
              affix: false,
              title: '隐藏Menu',
              isCustomSvg: true,
              icon: 'router',
              roles: [],
              badge: '',
              dot: false,
              tabHidden: false,
              dynamicNewTab: false,
              noKeepAlive: false,
              activeMenu: false,
              parentName: 'MetaIndex'
            },
            children: []
          }
        ]
      },
      {
        path: 'dynamicSegment',
        name: 'DynamicSegmentIndex',
        hidden: false,
        alwaysShow: false,
        redirect: '',
        component: '@/views/demo/dynamicSegment/index',
        meta: {
          affix: false,
          title: '路由传参',
          isCustomSvg: true,
          icon: 'arrow-left-right-line',
          roles: [],
          badge: '',
          dot: false,
          tabHidden: false,
          dynamicNewTab: false,
          noKeepAlive: false,
          activeMenu: false,
          parentName: 'Demo'
        },
        children: [
          {
            path: 'index',
            name: 'DynamicSegmentIndex',
            hidden: false,
            alwaysShow: false,
            redirect: '',
            component: '@/views/demo/dynamicSegment/dynamicSegment',
            meta: {
              affix: false,
              title: '路由传参',
              isCustomSvg: true,
              icon: 'arrow-left-right-line',
              roles: [],
              badge: '',
              dot: false,
              tabHidden: false,
              dynamicNewTab: false,
              noKeepAlive: false,
              activeMenu: false,
              parentName: 'DynamicSegmentIndex'
            },
            children: []
          },
          {
            path: 'query',
            name: 'DynamicSegmentQuery',
            alwaysShow: false,
            redirect: '',
            component: '@/views/demo/dynamicSegment/query',
            hidden: true,
            meta: {
              affix: false,
              title: 'query',
              isCustomSvg: true,
              icon: 'query',
              roles: [],
              badge: '',
              dot: false,
              tabHidden: false,
              dynamicNewTab: false,
              noKeepAlive: false,
              activeMenu: false,
              parentName: 'DynamicSegmentIndex'
            },
            children: []
          },
          {
            path: 'params',
            name: 'DynamicSegmentParam',
            alwaysShow: false,
            redirect: '',
            component: '@/views/demo/dynamicSegment/params',
            hidden: true,
            meta: {
              affix: false,
              title: 'params',
              isCustomSvg: true,
              icon: 'params',
              roles: [],
              badge: '',
              dot: false,
              tabHidden: false,
              dynamicNewTab: false,
              noKeepAlive: false,
              activeMenu: false,
              parentName: 'DynamicSegmentIndex'
            },
            children: []
          }
        ]
      },
      {
        path: 'nested',
        name: 'NestedIndex',
        component: '@/views/demo/nested',
        redirect: '/demo/nested/nested-1/nested-1-1/nested-1-1-1',
        alwaysShow: true,
        hidden: false,
        meta: {
          affix: false,
          title: '路由缓存',
          roles: ['admin'],
          isCustomSvg: true,
          icon: 'nested',
          badge: '',
          dot: false,
          tabHidden: false,
          dynamicNewTab: false,
          noKeepAlive: false,
          activeMenu: false,
          parentName: 'Demo'
        },
        children: [
          {
            path: 'nested-1',
            name: 'Nested-1',
            component: '@/views/demo/nested/nested1',
            redirect: '/demo/nested/nested-1/nested-1-1/nested-1-1-1',
            alwaysShow: true,
            hidden: false,
            meta: {
              affix: false,
              title: '多级路由-1',
              badge: '',
              dot: false,
              roles: ['admin'],
              isCustomSvg: true,
              icon: 'nested',
              tabHidden: false,
              dynamicNewTab: false,
              noKeepAlive: false,
              activeMenu: false,
              parentName: 'NestedIndex'
            },
            children: [
              {
                path: 'nested-1-1',
                name: 'Nested11',
                alwaysShow: true,
                component: '@/views/demo/nested/nested1/nested1-1',
                redirect: '',
                hidden: false,
                meta: {
                  affix: false,
                  title: '多级路由-1-1',
                  badge: '',
                  dot: false,
                  roles: ['admin'],
                  isCustomSvg: true,
                  icon: 'nested',
                  tabHidden: false,
                  dynamicNewTab: false,
                  noKeepAlive: false,
                  activeMenu: false,
                  parentName: 'Nested1'
                },
                children: [
                  {
                    path: 'nested-1-1-1',
                    name: 'Nested111',
                    alwaysShow: true,
                    component: '@/views/demo/nested/nested1/nested1-1/nested1-1-1',
                    redirect: '',
                    hidden: false,
                    meta: {
                      affix: false,
                      title: '多级路由-1-1-1',
                      badge: '',
                      dot: false,
                      roles: ['admin'],
                      isCustomSvg: true,
                      icon: 'nested',
                      tabHidden: false,
                      dynamicNewTab: false,
                      noKeepAlive: false,
                      activeMenu: false,
                      parentName: 'Nested11'
                    },
                    children: [
                      {
                        path: 'nested-1-1-1-1',
                        name: 'Nested1111',
                        hidden: false,
                        redirect: '',
                        alwaysShow: true,
                        component: '@/views/demo/nested/nested1/nested1-1/nested1-1-1/nested1-1-1-1',
                        meta: {
                          affix: false,
                          title: '多级路由-1-1-1-1',
                          badge: '',
                          dot: false,
                          roles: ['admin'],
                          isCustomSvg: true,
                          icon: 'nested',
                          tabHidden: false,
                          dynamicNewTab: false,
                          noKeepAlive: false,
                          activeMenu: false,
                          parentName: 'Nested111'
                        },
                        children: []
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
          affix: false,
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
          activeMenu: false,
          parentName: 'Demo'
        },
        children: []
      }
    ]
  },
  {
    path: '/setting',
    name: 'SettingIndex',
    component: 'Layout',
    redirect: '/setting/theme',
    hidden: false,
    alwaysShow: false,
    meta: {
      affix: false,
      title: '设置',
      icon: 'setting',
      dynamicNewTab: false,
      noKeepAlive: false,
      parentName: ''
    },
    children: [
      {
        path: 'theme',
        name: 'themeSetting',
        hidden: false,
        alwaysShow: false,
        redirect: '',
        component: '@/views/settings/themeSetting',
        meta: {
          affix: false,
          title: '主题设置',
          isCustomSvg: true,
          icon: 'theme',
          roles: [],
          badge: '',
          dot: false,
          tabHidden: false,
          dynamicNewTab: false,
          noKeepAlive: false,
          activeMenu: false,
          parentName: 'SettingIndex'
        }
      },
      {
        path: 'system',
        name: 'SystemSetting',
        hidden: false,
        alwaysShow: false,
        redirect: '',
        component: '@/views/settings/systemSetting',
        meta: {
          affix: false,
          title: '系统设置',
          isCustomSvg: true,
          icon: 'system',
          roles: ['admin'],
          badge: '',
          dot: false,
          tabHidden: false,
          dynamicNewTab: false,
          noKeepAlive: false,
          activeMenu: false,
          parentName: 'SettingIndex'
        }
      },
      {
        path: 'personal',
        name: 'PersonalCenter',
        hidden: false,
        alwaysShow: false,
        redirect: '',
        component: '@/views/settings/personalCenter',
        meta: {
          affix: false,
          title: '个人中心',
          isCustomSvg: true,
          icon: 'personal',
          roles: [],
          badge: '',
          dot: false,
          tabHidden: false,
          dynamicNewTab: false,
          noKeepAlive: false,
          activeMenu: false,
          parentName: 'SettingIndex'
        }
      },
      {
        path: 'role',
        name: 'RoleManagement',
        hidden: false,
        alwaysShow: false,
        redirect: '',
        component: '@/views/settings/roleManagement',
        meta: {
          affix: false,
          title: '角色权限',
          isCustomSvg: true,
          icon: 'jurisdiction',
          roles: ['admin'],
          badge: '',
          dot: false,
          tabHidden: false,
          dynamicNewTab: false,
          noKeepAlive: false,
          activeMenu: false,
          parentName: 'SettingIndex'
        }
      },
      {
        path: 'roles',
        name: 'RolesManagement',
        hidden: false,
        alwaysShow: false,
        redirect: '',
        component: '@/views/settings/roleManagement/roles',
        meta: {
          affix: false,
          title: '角色管理',
          isCustomSvg: true,
          icon: 'user',
          roles: ['admin'],
          badge: '',
          dot: false,
          tabHidden: false,
          dynamicNewTab: false,
          noKeepAlive: false,
          activeMenu: false,
          parentName: 'SettingIndex'
        }
      },
      {
        path: 'menu',
        name: 'MenuManagement',
        hidden: false,
        alwaysShow: false,
        redirect: '',
        component: '@/views/settings/menuManagement',
        meta: {
          affix: false,
          title: '菜单管理',
          isCustomSvg: true,
          icon: 'menu',
          roles: ['admin'],
          badge: '',
          dot: false,
          tabHidden: false,
          dynamicNewTab: false,
          noKeepAlive: false,
          activeMenu: false,
          parentName: 'SettingIndex'
        }
      }
    ]
  },
  {
    path: '/about',
    name: 'AboutIndex',
    component: 'Layout',
    hidden: false,
    alwaysShow: false,
    redirect: '/about/index',
    meta: {
      affix: false,
      title: '关于',
      isCustomSvg: true,
      icon: 'about',
      roles: [],
      badge: '',
      dot: false,
      tabHidden: false,
      dynamicNewTab: false,
      noKeepAlive: false,
      activeMenu: false,
      parentName: ''
    },
    children: [
      {
        path: 'index',
        name: 'AboutIndex',
        hidden: false,
        alwaysShow: false,
        redirect: '',
        component: '@/views/about/index',
        meta: {
          affix: false,
          title: '关于',
          isCustomSvg: true,
          icon: 'about',
          roles: [],
          badge: '',
          dot: false,
          tabHidden: false,
          dynamicNewTab: false,
          noKeepAlive: false,
          activeMenu: false,
          parentName: 'AboutIndex'
        }
      }
    ]
  }
]
module.exports = [
  {
    url: '/system/menuManagement/getRouterList',
    type: 'get',
    response(config) {
      const { role } = config.query
      let data = []
      const filterRouter = (dataList, role) => {
        dataList.forEach((item) => {
          if (item.children && item.children.length > 0) {
            filterRouter(item.children, role)
          } else {
            if (item.meta && item.meta.roles && item.meta.roles.length > 0 && item.meta.roles.indexOf(`${role}`) !== -1) data.push(item)
          }
        })
      }
      if (role) {
        filterRouter(router, role)
      } else {
        data = router
      }
      return {
        code: 200,
        message: 'success',
        data: data
      }
    }
  },
  {
    url: '/system/menuManagement/addRouter',
    type: 'post',
    response() {
      return {
        code: 200,
        message: '模拟添加成功'
      }
    }
  },
  {
    url: '/system/menuManagement/editRouter',
    type: 'post',
    response() {
      return {
        code: 200,
        message: '模拟保存成功'
      }
    }
  },
  {
    url: '/system/menuManagement/deleteRouter',
    type: 'post',
    response(config) {
      const { names } = config.body
      return {
        code: 200,
        message: '模拟删除' + names + '成功'
      }
    }
  }
]
