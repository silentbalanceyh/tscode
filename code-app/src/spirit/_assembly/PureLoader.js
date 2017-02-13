import PureAssembly from './PureAssembly'

class PureLoader extends PureAssembly{
  // ------------------------------------
  // 统一构造函数，提供当前组件名
  // ------------------------------------
  constructor(props, name) {
    super(props,{
      logger:'loader',
      name,
      parent:'PureLoader'
    })
  }
}

export default PureLoader
