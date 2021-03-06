export default (app) => {
  // 加载布局
  const requireLayout = require.context('./layouts', true, /\.vue$/)
  requireLayout.keys().forEach((fileName) => {
    const componentConfig = requireLayout(fileName)
    const componentName = componentConfig.default.name
    app.component(componentName, componentConfig.default || componentConfig)
  })

  // 加载组件
  const requireComponent = require.context('./components', true, /\.vue$/)
  requireComponent.keys().forEach((fileName) => {
    const componentConfig = requireComponent(fileName)
    const componentName = componentConfig.default.name
    app.component(componentName, componentConfig.default || componentConfig)
  })
}
