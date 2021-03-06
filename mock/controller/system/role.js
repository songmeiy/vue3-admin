module.exports = [
  {
    url: '/system/rolesManagement/getRolesList',
    type: 'get',
    response() {
      return {
        code: 200,
        message: 'success',
        data: [
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
      }
    }
  },
  {
    url: '/system/rolesManagement/deleteRole',
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
    url: '/system/rolesManagement/addRole',
    type: 'post',
    response() {
      return {
        code: 200,
        message: '模拟添加成功'
      }
    }
  },
  {
    url: '/system/rolesManagement/editRole',
    type: 'post',
    response() {
      return {
        code: 200,
        message: '模拟修改成功'
      }
    }
  }
]
