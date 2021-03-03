module.exports = [
  {
    url: '/demo/WangEditor/uploadImage',
    type: 'post',
    response() {
      return {
        code: 200,
        errno: 0,
        message: '模拟上传成功',
        data: [{
          url: 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif',
          alt: '',
          href: ''
        }]
      }
    }
  },
  {
    url: '/demo/WangEditor/deleteImage',
    type: 'post',
    response() {
      return {
        code: 200,
        errno: 0,
        message: '模拟删除成功',
        data: {}
      }
    }
  }
]
