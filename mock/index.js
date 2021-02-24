/**
 * @author WangZeping zepingwong@gmail.com
 * @description 导入所有 controller 模块，npm run serve时在node环境中自动输出controller文件夹下Mock接口，请勿修改。
 */

const { handleMockArray } = require('./utils')

const mocks = []
const mockArray = handleMockArray()
mockArray.forEach((item) => {
  console.log(item)
  const obj = require(item)
  mocks.push(...obj)
})
module.exports = {
  mocks
}
