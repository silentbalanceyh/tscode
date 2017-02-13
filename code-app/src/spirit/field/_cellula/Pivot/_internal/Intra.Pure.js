// ======================================================
// 支持组件类型
// type = hidden
// ======================================================
import Neuron from '../../Neuron/Neuron'
import Enteron from '../../Centrum/Enteron'
import Immutable from 'immutable'

const SUPPORTED = Immutable.fromJS(['hidden','arrayitem'])

class Pure{

  static render(config = {},input){
    if(config.type && SUPPORTED.contains(config.type)){
      return Neuron.jsxInput(config, input)
    }else{
      return false
    }
  }

  static marcher(config = {}, input) {
    config.type = 'text'
    return Enteron.jsxMarcher(config, input)
  }
}

export default Pure
