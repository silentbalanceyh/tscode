import PureModule from './PureModule'

class PureContainer extends PureModule{
  // ------------------------------------
  // 统一构造函数，提供当前组件名
  // ------------------------------------
  constructor(props, name) {
    super(props,{
      logger:'container',
      name,
      parent:'PureContainer'
    })
  }
}

export default PureContainer
