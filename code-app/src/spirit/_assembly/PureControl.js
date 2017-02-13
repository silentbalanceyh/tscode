import PureModule from './PureModule'

class PureControl extends PureModule{
  // ------------------------------------
  // 统一构造函数，提供当前组件名
  // ------------------------------------
  constructor(props, name) {
    super(props,{
      logger:'control',
      name,
      parent:'PureControl'
    })
  }
}

export default PureControl
