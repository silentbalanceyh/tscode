// ------------------------------------
// HDP: System
// ------------------------------------
// TODO：ui：应用子路由列表
import ModuleRoute from '../modules/routes'

import Container from './core/Container'

export default (store) => ({
  component:Container,
  childRoutes:[
    ModuleRoute(store)
  ]
})
