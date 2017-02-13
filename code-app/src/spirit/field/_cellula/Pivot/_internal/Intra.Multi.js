// ======================================================
// 支持组件类型
// type = text
// type = password
// type = number
// ======================================================
import Neuron from '../../Neuron/Neuron'
import Immutable from 'immutable'

const SUPPORTED = Immutable.fromJS(['multitext'])

class Multi{

  static render(config = {},input){
    if(config.type && SUPPORTED.contains(config.type)){
      const { range } = config
      if(!config.style) {
        config.className = `jsxMulti${range.columns}`
      }
      let karyon = Neuron.jsxTextArea(config,input)
      return karyon
    }else{
      return false
    }
  }
}

export default Multi
