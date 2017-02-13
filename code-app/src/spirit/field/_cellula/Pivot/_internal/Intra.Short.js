// ======================================================
// 支持组件类型
// type = text
// type = password
// type = number
// ======================================================
import Immune from '../../Centrum/Immune'
import Immutable from 'immutable'

const SUPPORTED = Immutable.fromJS(['text','password','number','counter','async'])

class Short{

  static render(config = {},input){
    if(config.type && SUPPORTED.contains(config.type)){
      let karyon = false
      if(config.unit){
        karyon = Immune.jsxUnit(config,input)
      }else if(config.icon){
        karyon = Immune.jsxIcon(config,input)
      }else{
        karyon = Immune.jsxPure(config,input)
      }
      return karyon
    }else{
      return false
    }
  }
}

export default Short
