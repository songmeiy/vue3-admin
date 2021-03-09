const roles = [
  {
    id: 1,
    role: 'User',
    label: '用户组',
    parentRole: '',
    children: [{
      id: 2,
      role: 'admin',
      label: '管理员',
      parentRole: 'User'
    }, {
      id: 3,
      role: 'editor',
      label: 'editor',
      parentRole: 'User'
    }]
  },
  {
    id: 4,
    role: 'Develop',
    label: '测试组',
    parentRole: '',
    children: [{
      id: 5,
      role: 'test',
      label: '测试用户',
      parentRole: 'Develop'
    }]
  }
]
module.exports = [
  {
    url: '/system/role/getList',
    type: 'get',
    response() {
      return {
        code: 200,
        totalCount: roles.length,
        data: roles
      }
    }
  },
  {
    url: '/system/role/doDelete',
    type: 'post',
    response(config) {
      const { roles } = config.body
      return {
        code: 200,
        message: '模拟删除角色' + roles + '成功'
      }
    }
  },
  {
    url: '/system/role/doAdd',
    type: 'post',
    response() {
      return {
        code: 200,
        message: '模拟添加成功'
      }
    }
  },
  {
    url: '/system/role/doEdit',
    type: 'post',
    response() {
      return {
        code: 200,
        message: '模拟修改成功'
      }
    }
  }
]
