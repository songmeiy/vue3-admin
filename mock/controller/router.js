/**
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到
 */
const data = [
  {
    path: '/',
    name: 'Root',
    component: 'Layout',
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
        component: '@/views/home',
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
        component: '@/views/home/workbench',
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
  {
    path: '/demo',
    name: 'Demo',
    component: 'Layout',
    redirect: '/demo/icon/icons',
    meta: {
      title: '组件',
      icon: 'component',
      dynamicNewTab: false,
      noKeepAlive: false
    },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: '@/views/demo/table',
        redirect: '/demo/table/custom',
        meta: {
          title: '表格',
          icon: 'table',
          noKeepAlive: false
        },
        children: [
          {
            path: 'comprehensive',
            name: 'ComprehensiveTable',
            component: '@/views/demo/table/comprehensive',
            meta: {
              title: '综合表格',
              icon: 'comprehensive',
              noKeepAlive: false
            }
          },
          {
            path: 'custom',
            name: 'CustomTable',
            component: '@/views/demo/table/custom',
            meta: {
              title: '自定义表格',
              icon: 'custom',
              noKeepAlive: false
            }
          },
          {
            path: 'inline',
            name: 'InlineTable',
            component: '@/views/demo/table/inline',
            meta: {
              title: '行内编辑表格',
              icon: 'edit-solid',
              noKeepAlive: false
            }
          },
          {
            path: 'detail',
            name: 'TableDetail',
            hidden: true,
            component: '@/views/demo/table/detail',
            meta: {
              title: '详情',
              icon: 'edit-solid',
              noKeepAlive: false
            }
          }
        ]
      },
      {
        path: 'icon',
        name: 'Icon',
        component: '@/views/demo/icon',
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
            component: '@/views/demo/icon/svgs',
            meta: {
              title: 'SVG图标',
              icon: 'svg',
              noKeepAlive: false
            }
          },
          {
            path: 'elementIcons',
            name: 'ElementIcons',
            component: '@/views/demo/icon/elements',
            meta: {
              title: 'Element图标',
              icon: 'element',
              noKeepAlive: false
            }
          },
          {
            path: 'iconSelector',
            name: 'IconSelector',
            component: '@/views/demo/icon/iconSelector',
            meta: {
              title: '图标选择器',
              icon: 'select',
              noKeepAlive: false
            }
          }
        ]
      },
      {
        path: 'form',
        name: 'Form',
        component: '@/views/demo/form',
        redirect: '/demo/form/comprehensive',
        meta: {
          icon: 'form',
          title: '表单'
        },
        children: [
          {
            path: 'comprehensive',
            name: 'ComprehensiveForm',
            component: '@/views/demo/form/comprehensive',
            meta: {
              icon: 'comprehensive-form',
              title: '综合表单'
            }
          },
          {
            path: 'steps',
            name: 'StepsForm',
            component: '@/views/demo/form/steps',
            meta: {
              icon: 'steps',
              title: '分步表单'
            }
          }
        ]
      },
      {
        path: 'timeline',
        name: 'TimeLine',
        component: '@/views/demo/timeline',
        meta: {
          title: '时间线',
          icon: 'timeline'
        }
      },
      {
        path: 'list',
        name: 'List',
        component: '@/views/demo/list',
        meta: {
          title: '列表',
          icon: 'stream-list'
        }
      },
      {
        path: 'editor',
        name: 'Editor',
        redirect: 'demo/editor/wangEditor',
        component: '@/views/demo/editor',
        meta: {
          title: '编辑器',
          icon: 'editor',
          noKeepAlive: false
        },
        children: [
          {
            path: 'wangEditor',
            name: 'WangEditor',
            component: '@/views/demo/editor/wangEditor',
            meta: {
              title: '富文本编辑器',
              icon: 'rich-text',
              noKeepAlive: false
            }
          },
          {
            path: 'markdownEditor',
            name: 'MarkdownEditor',
            component: '@/views/demo/editor/markdownEditor',
            meta: {
              title: 'MarkDown编辑器',
              icon: 'markdown',
              noKeepAlive: false
            }
          }
        ]
      },
      {
        path: 'excel',
        name: 'Excel',
        component: '@/views/demo/excel',
        redirect: '/demo/excel/export',
        meta: {
          title: 'Excel',
          icon: 'excel',
          noKeepAlive: false
        },
        children: [
          {
            path: 'export',
            name: 'ExportExcel',
            component: '@/views/demo/excel/export',
            meta: {
              title: '导出表格',
              icon: 'export',
              noKeepAlive: false
            }
          },
          {
            path: 'selected',
            name: 'ExportSelectedExcel',
            component: '@/views/demo/excel/selected',
            meta: {
              title: '导出选中数据',
              icon: 'select',
              noKeepAlive: false
            }
          },
          {
            path: 'merge',
            name: 'ExportMergeHeaderExcel',
            component: '@/views/demo/excel/merge',
            meta: {
              title: '导出合并表格',
              icon: 'merge',
              noKeepAlive: false
            }
          }
        ]
      },
      {
        path: 'ElementPlus',
        name: 'ElementPlus',
        component: '@/views/demo/ElementPlus',
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
            component: '@/views/demo/ElementPlus/notification',
            meta: {
              title: '通知',
              icon: 'notification',
              noKeepAlive: false
            }
          },
          {
            path: 'message',
            name: 'ElementPlusMessage',
            component: '@/views/demo/ElementPlus/message',
            meta: {
              title: '消息提示',
              icon: 'message',
              noKeepAlive: false
            }
          },
          {
            path: 'messageBox',
            name: 'ElementPlusMessageBox',
            component: '@/views/demo/ElementPlus/messageBox',
            meta: {
              title: 'messageBox',
              icon: 'messageBox',
              noKeepAlive: false
            }
          },
          {
            path: 'loading',
            name: 'ElementPlusLoading',
            component: '@/views/demo/ElementPlus/loading',
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
        component: '@/views/demo/meta',
        redirect: '/demo/meta/button',
        meta: {
          title: '路由参数',
          icon: 'router'
        },
        children: [
          {
            path: 'index',
            name: 'MetaIndex',
            component: '@/views/demo/meta/meta',
            meta: {
              title: '测试',
              icon: 'show'
            }
          },
          {
            path: 'dynamicMeta',
            name: 'DynamicMeta',
            component: '@/views/demo/meta/dynamicMeta',
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
            component: '@/views/demo/meta/allHidden',
            meta: {
              title: 'Menu&Tag',
              icon: 'router',
              tabHidden: true
            }
          },
          {
            path: 'metaTagHidden',
            name: 'MetaTagHidden',
            component: '@/views/demo/meta/tagHidden',
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
            component: '@/views/demo/meta/menuHidden',
            meta: {
              title: '隐藏Menu',
              icon: 'router'
            }
          }
        ]
      },
      {
        path: 'dynamicSegment',
        name: 'DynamicSegment',
        component: '@/views/demo/dynamicSegment/index',
        meta: {
          title: '路由传参',
          icon: 'arrow-left-right-line',
          noKeepAlive: false
        },
        children: [
          {
            path: 'index',
            name: 'DynamicSegmentIndex',
            component: '@/views/demo/dynamicSegment/dynamicSegment',
            meta: {
              title: '路由传参',
              icon: 'arrow-left-right-line',
              noKeepAlive: false
            }
          },
          {
            path: 'query',
            name: 'DynamicSegmentQuery',
            component: '@/views/demo/dynamicSegment/query',
            hidden: true,
            meta: {
              title: 'query',
              icon: 'query',
              noKeepAlive: true
            }
          },
          {
            path: 'params',
            name: 'DynamicSegmentParam',
            component: '@/views/demo/dynamicSegment/params',
            hidden: true,
            meta: {
              title: 'params',
              icon: 'params',
              noKeepAlive: true
            }
          }
        ]
      },
      {
        path: 'nested',
        name: 'Nested',
        component: '@/views/demo/nested',
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
            component: '@/views/demo/nested/nested1',
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
                component: '@/views/demo/nested/nested1/nested1-1',
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
                    component: '@/views/demo/nested/nested1/nested1-1/nested1-1-1',
                    children: [
                      {
                        path: 'nested-1-1-1-1',
                        name: 'Nested1111',
                        meta: {
                          title: '多级路由-1-1-1-1',
                          noKeepAlive: false
                        },
                        component: '@/views/demo/nested/nested1/nested1-1/nested1-1-1/nested1-1-1-1'
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
        meta: {
          title: '外链',
          target: '_blank',
          icon: 'external-link'
        }
      }
    ]
  },
  {
    path: '/setting',
    name: 'Setting',
    component: 'Layout',
    redirect: '/setting/theme',
    meta: {
      title: '设置',
      icon: 'setting',
      dynamicNewTab: false,
      noKeepAlive: false
    },
    children: [
      {
        path: 'theme',
        name: 'themeSetting',
        component: '@/views/settings/themeSetting',
        meta: {
          title: '主题设置',
          icon: 'theme',
          noKeepAlive: false
        }
      },
      {
        path: 'system',
        name: 'systemSetting',
        component: '@/views/settings/systemSetting',
        meta: {
          title: '系统设置',
          icon: 'system',
          roles: ['admin'],
          noKeepAlive: false
        }
      },
      {
        path: 'personalCenter',
        name: 'personalCenter',
        component: '@/views/settings/personalCenter',
        meta: {
          title: '个人中心',
          icon: 'personal',
          noKeepAlive: false
        }
      },
      {
        path: 'roles',
        name: 'Roles',
        component: '@/views/settings/roles',
        meta: {
          title: '角色权限',
          icon: 'user',
          roles: ['admin'],
          noKeepAlive: false
        }
      }
    ]
  },
  {
    path: '/test',
    name: 'Test',
    component: 'Layout',
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
        component: '@/views/test/index',
        meta: {
          title: '错误测试',
          icon: '404',
          noKeepAlive: false
        }
      }
    ]
  }
]
module.exports = [
  {
    url: '/router/getList',
    type: 'get',
    response() {
      return {
        code: 200,
        message: 'success',
        data
      }
    }
  }
]
