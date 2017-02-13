import PureAssembly from './PureAssembly'

class PureSlice extends PureAssembly{
  // ------------------------------------
  // 统一构造函数，提供当前组件名
  // ------------------------------------
  constructor(props, name) {
    super(props,{
      logger:'slice',
      name,
      parent:'PureSlice'
    })
  }
}

export default PureSlice
