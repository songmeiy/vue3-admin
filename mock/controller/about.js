const data = {
  description: '作者说：我这一生都太安静了，思考太久了，现在该行动了'
}

module.exports = [
  {
    url: '/description/getList',
    type: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data
      }
    }
  }
]
