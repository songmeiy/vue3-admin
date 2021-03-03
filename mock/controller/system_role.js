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
            children: [{
              id: 2,
              role: 'admin',
              label: '管理员'
            }, {
              id: 3,
              role: 'editor',
              label: 'editor'
            }]
          },
          {
            id: 4,
            role: 'Develop',
            label: '测试组',
            children: [{
              id: 5,
              role: 'test',
              label: '测试用户'
            }]
          }
        ]
      }
    }
  },
  {
    url: '/system/rolesManagement/deleteRole',
    type: 'post',
    response() {
      return {
        code: 200,
        message: '模拟删除成功'
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
