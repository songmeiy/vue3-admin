const data = [{
  label: 'Layout',
  component: 'Layout'
}, {
  label: 'Home',
  component: '@/views/home/home'
}, {
  label: 'Workbench',
  component: '@/views/home/workbench'
}, {
  label: 'Icons',
  component: '@/views/demo/icon/icons'
}]
module.exports = [
  {
    url: '/system/components/getList',
    type: 'get',
    response() {
      return {
        code: 200,
        data: data
      }
    }
  }
]
