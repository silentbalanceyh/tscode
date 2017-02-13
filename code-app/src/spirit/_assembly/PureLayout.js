import PureAssembly from './PureAssembly'

class PureLayout extends PureAssembly{
  // ------------------------------------
  // 统一构造函数，提供当前组件名
  // ------------------------------------
  constructor(props, name) {
    super(props,{
      logger:'layout',
      name,
      parent:'PureLayout'
    })
  }
}

export default PureLayout
