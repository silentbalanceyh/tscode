import PureModule from './PureModule'

class PureBusiness extends PureModule{
  // ------------------------------------
  // 统一构造函数，提供当前组件名
  // ------------------------------------
  constructor(props, name) {
    super(props,{
      logger:'business',
      name,
      parent:'PureBusiness'
    })
  }
}

export default PureBusiness
